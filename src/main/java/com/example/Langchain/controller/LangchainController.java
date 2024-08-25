//package com.example.Langchain.controller;
//
//
//
//import com.theokanning.openai.client.OpenAiApi;
//import com.theokanning.openai.completion.CompletionRequest;
//import com.theokanning.openai.completion.CompletionResult;
//import com.theokanning.openai.completion.chat.*;
//import com.theokanning.openai.service.FunctionExecutor;
//import com.theokanning.openai.service.OpenAiService;
//import org.jetbrains.annotations.NotNull;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.*;
//
//@RestController
//@RequestMapping("/api/chat")
//public class LangchainController {
//
//    @PostMapping("/message")
//    public List<ChatMessage> getResponse(@RequestBody ChatCompletionRequest request){
//        List<ChatMessage> messages = new ArrayList<>();
//        List<ChatFunction> functionList = new List<ChatFunction>() {
//            @Override
//            public int size() {
//                return 0;
//            }
//
//            @Override
//            public boolean isEmpty() {
//                return false;
//            }
//
//            @Override
//            public boolean contains(Object o) {
//                return false;
//            }
//
//            @NotNull
//            @Override
//            public Iterator<ChatFunction> iterator() {
//                return null;
//            }
//
//            @NotNull
//            @Override
//            public Object[] toArray() {
//                return new Object[0];
//            }
//
//            @NotNull
//            @Override
//            public <T> T[] toArray(@NotNull T[] a) {
//                return null;
//            }
//
//            @Override
//            public boolean add(ChatFunction chatFunction) {
//                return false;
//            }
//
//            @Override
//            public boolean remove(Object o) {
//                return false;
//            }
//
//            @Override
//            public boolean containsAll(@NotNull Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public boolean addAll(@NotNull Collection<? extends ChatFunction> c) {
//                return false;
//            }
//
//            @Override
//            public boolean addAll(int index, @NotNull Collection<? extends ChatFunction> c) {
//                return false;
//            }
//
//            @Override
//            public boolean removeAll(@NotNull Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public boolean retainAll(@NotNull Collection<?> c) {
//                return false;
//            }
//
//            @Override
//            public void clear() {
//
//            }
//
//            @Override
//            public ChatFunction get(int index) {
//                return null;
//            }
//
//            @Override
//            public ChatFunction set(int index, ChatFunction element) {
//                return null;
//            }
//
//            @Override
//            public void add(int index, ChatFunction element) {
//
//            }
//
//            @Override
//            public ChatFunction remove(int index) {
//                return null;
//            }
//
//            @Override
//            public int indexOf(Object o) {
//                return 0;
//            }
//
//            @Override
//            public int lastIndexOf(Object o) {
//                return 0;
//            }
//
//            @NotNull
//            @Override
//            public ListIterator<ChatFunction> listIterator() {
//                return null;
//            }
//
//            @NotNull
//            @Override
//            public ListIterator<ChatFunction> listIterator(int index) {
//                return null;
//            }
//
//            @NotNull
//            @Override
//            public List<ChatFunction> subList(int fromIndex, int toIndex) {
//                return List.of();
//            }
//        };
//        FunctionExecutor functionExecutor = new FunctionExecutor(functionList);
//        ChatMessage userMessage = new ChatMessage(ChatMessageRole.USER.value(), "Introduce yourself");
//        messages.add(userMessage);
//        OpenAiService service = new OpenAiService("sk-vBfGLqr9zZjAja39wT6zebmK8EE83ClMQIFfNJ3zV-T3BlbkFJI5NNuGOTQfOCa7AUHLHwX_ABHV-JcN6htQn3DX03sA");
//        ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
//                .builder()
//                .model("gpt-3.5-turbo")
//                .messages(messages)
//                .functions(functionExecutor.getFunctions())
//                .functionCall(new ChatCompletionRequest.ChatCompletionRequestFunctionCall("auto"))
//                .maxTokens(256)
//                .build();
//        ChatMessage responseMessage = service.createChatCompletion(chatCompletionRequest).getChoices().get(0).getMessage();
//        ChatFunctionCall functioncall = responseMessage.getFunctionCall();
//        ChatMessage functionResponseMessage = functionExecutor.executeAndConvertToMessageHandlingExceptions(functioncall);
//        messages.add(responseMessage);
//        return messages;
//    }
//
////    @GetMapping("/getChat/{prompt}")
////    public String getPrompt(@PathVariable String prompt){
////        //  v1/completion -> text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001
////        OpenAiService service = new OpenAiService("sk-vBfGLqr9zZjAja39wT6zebmK8EE83ClMQIFfNJ3zV-T3BlbkFJI5NNuGOTQfOCa7AUHLHwX_ABHV-JcN6htQn3DX03sA");
////        CompletionRequest completionRequest = CompletionRequest.builder().prompt(prompt).model("text-davinci-003").echo(true).build();
////        return service.createCompletion(completionRequest).getChoices().get(0).getText();
////    }
//}
