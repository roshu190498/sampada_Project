package com.example.letsgoapplication.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.adapter.BusAdapter;
import com.example.letsgoapplication.adapter.SeatAdapter;
import com.example.letsgoapplication.model.Bus;
import com.example.letsgoapplication.model.Seat;
import com.example.letsgoapplication.utils.Constants;
import com.example.letsgoapplication.utils.Utils;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import java.util.ArrayList;

public class BookSeat extends AppCompatActivity implements SeatAdapter.ActionListener{

    RecyclerView recyclerView;
    ArrayList<Seat> seats = new ArrayList<>();
    SeatAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_seat);

        recyclerView = findViewById(R.id.recyclerView);
        adapter = new SeatAdapter(this,seats,this);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

    }

    @Override
    protected void onResume() {
        super.onResume();

        Intent intent = getIntent();
        Bus bus = (Bus) intent.getSerializableExtra("bus");
        Log.e("BookSeat", "bus" + bus.getBus_no());
        String bus_no=bus.getBus_no();

        loadSeats(bus_no);

    }

void loadSeats(String bus_no)
{
    seats.clear();
    final String url = Utils.getUrl(Constants.PATH_BUS + bus_no);
    Log.e("BookSeat","url++++"+url);
    final JsonObject body = new JsonObject();
    body.addProperty("bus_no", bus_no);
    Ion.with(this)
            .load(url)
            .asJsonObject()
            .setCallback(new FutureCallback<JsonObject>() {
                @Override
                public void onCompleted(Exception e, JsonObject result) {
                    String status = result.get("status").getAsString();
                    if (status.equals("data")) {
                        JsonArray tempSeats = result.get("data").getAsJsonArray();
                        for (int index = 0; index < tempSeats.size(); index++) {
                            JsonObject object = tempSeats.get(index).getAsJsonObject();

                            Seat seat = new Seat();
                            seat.setBus_no(object.get("bus_no").getAsString());
                            seat.setSeat_no(object.get("seat_no").getAsInt());
                            seat.setStatus(object.get("status").getAsInt());

                            seats.add(seat);
                        }
                        adapter.notifyDataSetChanged();
                    }
                }
            });
     }

    @Override
    public void onClick(int position) {
        Seat seat = seats.get(position);

        Intent intent = new Intent(this, ConfirmBooking.class);
        intent.putExtra("seat",seat);
        startActivity(intent);
    }

}