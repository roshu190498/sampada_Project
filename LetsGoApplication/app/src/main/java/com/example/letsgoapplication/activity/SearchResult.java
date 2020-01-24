package com.example.letsgoapplication.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.adapter.BusAdapter;
import com.example.letsgoapplication.model.Bus;
import com.example.letsgoapplication.utils.Constants;
import com.example.letsgoapplication.utils.Utils;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import java.util.ArrayList;

public class SearchResult extends AppCompatActivity implements BusAdapter.ActionListener {

    ArrayList<Bus> buses = new ArrayList<>();
    RecyclerView recyclerView;
    BusAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_result);

        recyclerView = findViewById(R.id.recyclerView);
        adapter = new BusAdapter(this, buses,this);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

    }
    @Override
    protected void onResume() {
        super.onResume();
        String source_city_name = getIntent().getStringExtra("source_city_name");
        String destination_city_name = getIntent().getStringExtra("destination_city_name");
        Log.e("SearchActivity","source_city_name+++"+source_city_name);
        Log.e("SearchActivity","destination_city_name+++"+destination_city_name);


        loadBuses(source_city_name,destination_city_name);
    }

    void loadBuses(String source_city_name,String destination_city_name) {

        buses.clear();
        final String url = Utils.getUrl(Constants.PATH_BUS + source_city_name +'/'+ destination_city_name);
        Log.e("SearchActivity","url++++"+url);
        final JsonObject body = new JsonObject();
        body.addProperty("source_city_name", source_city_name);
        body.addProperty("destination_city_name", destination_city_name);
        Ion.with(this)
                .load(url)
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        String status = result.get("status").getAsString();
                        if (status.equals("data")) {
                            JsonArray tempBuses = result.get("data").getAsJsonArray();
                            for (int index = 0; index < tempBuses.size(); index++) {
                                JsonObject object = tempBuses.get(index).getAsJsonObject();

                                Bus bus = new Bus();
                                bus.setBus_no(object.get("bus_no").getAsString());
                                bus.setBus_name(object.get("bus_name").getAsString());
                                bus.setPrice(object.get("price").getAsInt());
                                bus.setBus_type(object.get("bus_type").getAsString());
                                bus.setArrival_time(object.get("arrival_time").getAsString());
                                bus.setDeparture_time(object.get("departure_time").getAsString() );
                                bus.setSource_city_name(object.get("source_city_name").getAsString());
                                bus.setDestination_city_name(object.get("destination_city_name").getAsString());

                                buses.add(bus);
                            }
                            adapter.notifyDataSetChanged();
                        }
                    }
                });
    }

    @Override
    public void onClick(int position)
    {
        Bus bus = buses.get(position);

        Intent intent = new Intent(this, BookSeat.class);
        intent.putExtra("bus",bus);
        startActivity(intent);
    }
}
