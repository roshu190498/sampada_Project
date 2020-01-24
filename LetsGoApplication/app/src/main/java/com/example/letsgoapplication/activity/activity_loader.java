package com.example.letsgoapplication.activity;

import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.letsgoapplication.R;

public class activity_loader extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loader);

        ActionBar actionBar =getSupportActionBar();
        actionBar.hide();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try{
                    Thread.sleep(1000);
                   }
                   catch(InterruptedException e){
                    e.printStackTrace();
                   }

                Intent intent = new Intent(activity_loader.this,activity_login.class);
                startActivity(intent);
                   finish();
            }
        }).start();
    }
}
