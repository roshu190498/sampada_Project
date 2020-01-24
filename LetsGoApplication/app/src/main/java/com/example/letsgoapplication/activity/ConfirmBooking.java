package com.example.letsgoapplication.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.model.Seat;

import org.w3c.dom.Text;

public class ConfirmBooking extends AppCompatActivity {

    TextView textBusname,textSeatno,textSourcecity,textDestinationcity,textArrivaltime,textDeparturetime,textPrice,
            textBustype,textPickup,textDropping,textName,textAge,textGender,textMobno;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm_booking);

        textBusname = findViewById(R.id.textBusname);
        textSeatno = findViewById(R.id.textSeatno);
        textSourcecity = findViewById(R.id.textSourcecity);
        textDestinationcity = findViewById(R.id.textDestinationcity);
        textArrivaltime = findViewById(R.id.textArrivaltime);
        textDeparturetime = findViewById(R.id.textDeparturetime);
        textSeatno = findViewById(R.id.textSeatno);
        textSeatno = findViewById(R.id.textSeatno);
        textSeatno = findViewById(R.id.textSeatno);
        textSeatno = findViewById(R.id.textSeatno);
        textSeatno = findViewById(R.id.textSeatno);
        textSeatno = findViewById(R.id.textSeatno);
        textSeatno = findViewById(R.id.textSeatno);

    }

    @Override
    protected void onResume()
    {
        Intent intent = getIntent();
        Seat seat = (Seat) intent.getSerializableExtra("seat");
        Log.e("ConfirmBooking","seat_no"+seat.getSeat_no());
        Log.e("ConfirmBooking","bus_no"+seat.getBus_no());

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        int user_id = preferences.getInt("user_id",0);
        Log.e("ConfirmBooking","user_id++++"+user_id);

       String bus_no = seat.getBus_no();
        super.onResume();
        loadBusDetails(bus_no);
    }

    void loadBusDetails(String bus_no)
    {

    }
}
