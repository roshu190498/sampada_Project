package com.example.letsgoapplication.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.model.Seat;

import java.util.ArrayList;

public class SeatAdapter extends RecyclerView.Adapter<SeatAdapter.ViewHolder>
{
    public interface ActionListener
    {
        void onClick(int position);
    }

    private final Context context;
    private final ArrayList<Seat> seats;
    private final ActionListener listener;


    public SeatAdapter(Context context, ArrayList<Seat> seats,ActionListener listener)
    {
        this.context = context;
        this.seats = seats;
        this.listener = listener;
    }

    @NonNull
    @Override
    public SeatAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType)
    {
        LayoutInflater inflater = LayoutInflater.from(context);
        return new ViewHolder(inflater.inflate(R.layout.recyclerview_seat,null));
    }

    @Override
    public void onBindViewHolder(@NonNull SeatAdapter.ViewHolder holder,final int position)
    {
        Seat seat = seats.get(position);
        holder.textSeat.setText(" "+seat.getSeat_no());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClick(position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return seats.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        TextView textBusno,textSeat,textStatus;

        public ViewHolder(@NonNull View itemView)
        {
            super(itemView);
            textSeat = itemView.findViewById(R.id.textSeat);
        }
    }
}
