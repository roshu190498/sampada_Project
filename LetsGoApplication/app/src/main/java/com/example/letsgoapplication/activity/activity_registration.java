package com.example.letsgoapplication.activity;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.utils.Constants;
import com.example.letsgoapplication.utils.Utils;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

public class activity_registration extends AppCompatActivity {

    EditText editName,editEmail,editPassword,editPhone,editGender,editAge;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        editEmail = findViewById(R.id.editEmail);
        editName = findViewById(R.id.editName);
        editPassword = findViewById(R.id.editPassword);
        editPhone = findViewById(R.id.editPhone);
        editGender = findViewById(R.id.editGender);
        editAge = findViewById(R.id.editAge);
    }

    public void onRegister(View view)
    {
        String email = editEmail.getText().toString();
        String full_name = editName.getText().toString();
        String password = editPassword.getText().toString();
        String mob_no = editPhone.getText().toString();
        String gender = editGender.getText().toString();
        String age = editAge.getText().toString();


        if (email.length() == 0)
        {
            editName.setError("Name is mandatory");
        }
        else if (full_name.length() == 0)
        {
            editEmail.setError("Email is mandatory");
        }
        else if (password.length() == 0)
        {
            editPassword.setError("Password is mandatory");
        }
        else if (mob_no.length() == 0)
        {
            editPhone.setError("contact number is mandatory");
        }
        else if (gender.length() == 0)
        {
            editPassword.setError("gender is mandatory");
        }
        else if (age.length() == 0)
        {
            editAge.setError("age is mandatory");
        }
        else
            {
            final String url = Utils.getUrl(Constants.PATH_USER + "/register");

            final JsonObject body = new JsonObject();
            body.addProperty("email", email);
            body.addProperty("full_name", full_name);
            body.addProperty("password", password);
            body.addProperty("mob_no", mob_no);
            body.addProperty("gender", gender);
            body.addProperty("age", age);

            Log.e("activity_registration","body"+body);

                Ion.with(this)
                        .load("POST", url)
                        .setJsonObjectBody(body)
                        .asJsonObject()
                        .setCallback(new FutureCallback<JsonObject>() {
                            @Override
                            public void onCompleted(Exception e, JsonObject result) {
                                Log.d("URL", url);
                                String status = result.get("status").getAsString();
                                if (status.equals("data")) {
                                    Toast.makeText(activity_registration.this, "SUCCESS", Toast.LENGTH_SHORT).show();
                                    finish();
                                } else {
                                    String error = result.get("error").getAsString();
                                    Toast.makeText(activity_registration.this, error, Toast.LENGTH_SHORT).show();
                                }
                            }
                        });

            }
    }


    public void onCancle(View view)
    {
        finish();
    }
}
