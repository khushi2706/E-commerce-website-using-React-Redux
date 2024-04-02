import streamlit as st
from operator import itemgetter
from langchain.llms import LlamaCpp
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
# from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema.runnable import RunnablePassthrough, RunnableLambda
from huggingface_hub import hf_hub_download


# StreamHandler to intercept streaming output from the LLM.
# This makes it appear that the Language Model is "typing"
# in realtime.
class StreamHandler(BaseCallbackHandler):
    def __init__(self, container, initial_text=""):
        self.container = container
        self.text = initial_text

    def on_llm_new_token(self, token: str, **kwargs) -> None:
        self.text += token
        self.container.markdown(self.text)


@st.cache_resource
def create_chain(system_prompt):
    # --- Disabled ---
    # A stream handler to direct streaming output on the chat screen.
    # This will need to be handled somewhat differently.
    # But it demonstrates what potential it carries.
    # stream_handler = StreamHandler(st.empty())

    # --- Disabled ---
    # Callback manager is a way to intercept streaming output from the
    # LLM and take some action on it. Here we are giving it our custom
    # stream handler to make it appear as if the LLM is typing the
    # responses in real time.
    # callback_manager = CallbackManager([stream_handler])

    (repo_id, model_file_name) = ("TheBloke/Mistral-7B-Instruct-v0.1-GGUF",
                                  "mistral-7b-instruct-v0.1.Q4_0.gguf")

    model_path = hf_hub_download(repo_id=repo_id,
                                 filename=model_file_name,
                                 repo_type="model")

    # initialize LlamaCpp llm model
    # n_gpu_layers, n_batch, and n_ctx are for GPU support.
    # When not set, CPU will be used.
    # set 1 for mac m2, and higher numbers based on your GPU support
    llm = LlamaCpp(
            model_path=model_path,
            temperature=0,
            max_tokens=512,
            top_p=1,
            # callback_manager=callback_manager,
            # n_gpu_layers=1,
            # n_batch=512,
            # n_ctx=4096,
            verbose=False,
            streaming=True,
            stop=["Human:"]
            )

    # system_prompt will include instructions to the llm. This might also be
    # related to the persona that we desire the llm to assume.
    # We will then add a placeholder for the chat history and name of the input
    # variable which we will use to pass the history into the template.
    # Next, we specify the placeholder for the user prompt as {human_input}.
    # Lastly, we include an empty "ai" prompt to indicate the end of user input
    # and start of ai response.
    # We create a prompt from the template so we can use it with langchain
    prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{human_input}"),
            ("ai", ""),
        ])

    # Conversation buffer memory will keep track of the conversation in the
    # memory. It will use the "chat_history" as the name of the key.
    memory = ConversationBufferMemory(memory_key="chat_history",
                                      return_messages=True)

    # utility method that takes in the previous user prompt and generated ai
    # response and stores it in the conversational memory.
    def save_memory(inputs_outputs):
        inputs = {"human": inputs_outputs["human"]}
        outputs = {"ai": inputs_outputs["ai"]}
        memory.save_context(inputs, outputs)

    # utility function to print chat history to the console after every
    # interaction.
    def debug_memory():
        print("\n", "#"*10, "\n")
        print(memory.load_memory_variables({}))
        print("\n", "#"*10, "\n")

    # utility function to extract the ai response and return it. There must be
    # a better way to handle it but I can't find any examples or documentation
    # on how to achieve the same. So I created this function instead.
    def extract_response(chain_response):
        # debug_memory()
        return chain_response["ai"]

    # We create the internal llm chain first that takes our input and chat
    # history and wraps it in a dictionary before passing it as input to our
    # prompt. The prompt is then passed to our llm to generate an ai response.
    llm_chain = {
            "human_input": RunnablePassthrough(),
            "chat_history": (
                RunnableLambda(memory.load_memory_variables) |
                itemgetter("chat_history")
            )
        } | prompt | llm

    # Since we need to manually inject our inputs and ai response into the
    # memory we need to keep track of the initial prompt that we send through
    # the chain so we can then save it to the memory with the generated ai
    # response. In order to do that, we create a parallel dummy "chain", which
    # will serve as passthrough chain for our prompt while the second chain
    # will be used to generate an ai response based on our prompt and the chat
    # history using the previous "llm_chain". We then combine both chains in a
    # dictionary and past it to two more chains in parallel. First chain will
    # call save our prompt and ai response to the chat history and second chain
    # will extract the ai response and return that as the output of the chain.
    chain_with_memory = RunnablePassthrough() | {
                "human": RunnablePassthrough(),
                "ai": llm_chain
            } | {
                "save_memory": RunnableLambda(save_memory),
                "ai": itemgetter("ai")
            } | RunnableLambda(extract_response)

    return chain_with_memory


# Set the webpage title
st.set_page_config(
    page_title="Your own Chat!"
)

# Create a header element
st.header("Your own Chat!")

# This sets the LLM's personality for each prompt.
# The initial personality privided is basic.
# Try something interesting and notice how the LLM responses are affected.
system_prompt = st.text_area(
    label="System Prompt",
    value="You are a helpful AI assistant who answers questions in short sentences.",
    key="system_prompt")

# Create llm chain to use for our chat bot.
llm_chain = create_chain(system_prompt)

# We store the conversation in the session state.
# This will be used to render the chat conversation.
# We initialize it with the first message we want to be greeted with.
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "How may I help you today?"}
    ]

if "current_response" not in st.session_state:
    st.session_state.current_response = ""

# We loop through each message in the session state and render it as
# a chat message.
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# We take questions/instructions from the chat input to pass to the LLM
if user_prompt := st.chat_input("Your message here", key="user_input"):

    # Add our input to the session state
    st.session_state.messages.append(
        {"role": "user", "content": user_prompt}
    )

    # Add our input to the chat window
    with st.chat_message("user"):
        st.markdown(user_prompt)

    # Pass our input to the llm chain and capture the final responses.
    # It is worth noting that the Stream Handler is already receiving the
    # streaming response as the llm is generating. We get our response
    # here once the llm has finished generating the complete response.
    response = llm_chain.invoke(user_prompt)

    # Add the response to the session state
    st.session_state.messages.append(
        {"role": "assistant", "content": response}
    )

    # Add the response to the chat window
    with st.chat_message("assistant"):
        st.markdown(response)