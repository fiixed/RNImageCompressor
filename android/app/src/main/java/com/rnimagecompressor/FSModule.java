package com.rnimagecompressor;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class FSModule extends ReactContextBaseJavaModule {
    public FSModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "fsModule";
    }

    @ReactMethod
    public void justGreetMe(String name, Promise promise) {
        promise.resolve("Hi, " + name);
    }
    
    @ReactMethod
    public void getSize(String uri, Promise promise) {
        File file = new File(uri);
        int size = (int) file.length();
        promise.resolve(size);
    }
}
