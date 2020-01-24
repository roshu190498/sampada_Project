package com.example.letsgoapplication.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.letsgoapplication.R;

public class ClientActivity extends AppCompatActivity {

    EditText editSource,editDestination;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_client);

        editSource=findViewById(R.id.editSource);
        editDestination=findViewById(R.id.editDestination);
    }

    public void onSearch(View view)
    {
        String source_city_name = editSource.getText().toString();
        String destination_city_name = editDestination.getText().toString();

        if(source_city_name.length()==0)
        {
            Toast.makeText(ClientActivity.this, "Enter source city properly", Toast.LENGTH_SHORT).show();
        }
        else if(destination_city_name.length()==0)
        {
            Toast.makeText(ClientActivity.this, "Enter destination city properly", Toast.LENGTH_SHORT).show();
        }
        else{
            Intent intent = new Intent(ClientActivity.this,SearchResult.class);
            intent.putExtra("source_city_name",source_city_name);
            intent.putExtra("destination_city_name",destination_city_name);
            startActivity(intent);
           }
    }
}
