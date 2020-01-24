package com.example.letsgoapplication.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.utils.Constants;
import com.example.letsgoapplication.utils.Utils;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

public class activity_login extends AppCompatActivity {

    EditText editEmail, editPassword;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
    }

    public void onRegister(View view) {
        Intent intent = new Intent(activity_login.this, activity_registration.class);
        startActivity(intent);
    }

    public void onLogin(View view) {
        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();

        if (email.length() == 0) {
            editEmail.setError("email is madatory");
        } else if (password.length() == 0) {
            editPassword.setError("password is madatory");
        } else {
            final String url = Utils.getUrl(Constants.PATH_USER + "/login");

            final JsonObject body = new JsonObject();
            body.addProperty("email", email);
            body.addProperty("password", password);

            Ion.with(this)
                    .load("POST", url)
                    .setJsonObjectBody(body)
                    .asJsonObject()
                    .setCallback(new FutureCallback<JsonObject>() {
                        @Override
                        public void onCompleted(Exception e, JsonObject result) {
                            String status = result.get("status").getAsString();
                            if (status.equals("data")) {


                                JsonObject object = result.get("data").getAsJsonObject();

                                SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(activity_login.this);
                                preferences.edit()
                                        .putInt("user_id",object.get("user_id").getAsInt())
                                        .putBoolean("login_status",true)
                                        .commit();

                                Intent intent = new Intent(activity_login.this, ClientActivity.class);
                                startActivity(intent);
                                finish();
                            } else {
                                String error = String.valueOf(result.get("error"));
                                Toast.makeText(activity_login.this, "User does not exist", Toast.LENGTH_SHORT).show();
                            }
                        }
                    });

        }
    }
}