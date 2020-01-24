package com.example.letsgoapplication.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.letsgoapplication.R;
import com.example.letsgoapplication.model.Bus;

import java.util.ArrayList;

public class BusAdapter extends RecyclerView.Adapter<BusAdapter.ViewHolder>
{
    public interface ActionListener
    {
        void onClick(int position);
    }

    private final Context context;
    private final ArrayList<Bus> buses;
    private final ActionListener listener;

    public BusAdapter(Context context, ArrayList<Bus> buses,ActionListener listener)
    {
        this.context = context;
        this.buses = buses;
        this.listener = listener;
    }

    @NonNull
    @Override
    public BusAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType)
    {
        LayoutInflater inflater = LayoutInflater.from(context);
        return new ViewHolder(inflater.inflate(R.layout.recyclerview_bus_list,null));
    }

    @Override
    public void onBindViewHolder(@NonNull BusAdapter.ViewHolder holder,final int position)
    {
      Bus bus = buses.get(position);
      holder.textBusno.setText(bus.getBus_no());
      holder.textBusname.setText(bus.getBus_name());
      holder.textBusprice.setText(" "+bus.getPrice());
      holder.textBustype.setText(bus.getBus_type());
      holder.textBusSourcecity.setText(bus.getSource_city_name());
      holder.textBusdestinationcity.setText(bus.getDestination_city_name());
      holder.textBusArrivaltime.setText(bus.getArrival_time());
      holder.textBusDeparturetime.setText(bus.getDeparture_time());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClick(position);
            }
        });

    }

    @Override
    public int getItemCount() {
        return buses.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{

        TextView textBusno,textBusname,textBusprice,textBustype,textBusSourcecity,textBusdestinationcity,textBusArrivaltime,textBusDeparturetime;

        public ViewHolder(@NonNull View itemView)
        {
            super(itemView);

            textBusno = itemView.findViewById(R.id.textBusno);
            textBusname = itemView.findViewById(R.id.textBusname);
            textBusprice = itemView.findViewById(R.id.textBusprice);
            textBustype = itemView.findViewById(R.id.textBustype);
            textBusSourcecity = itemView.findViewById(R.id.textBusSourcecity);
            textBusdestinationcity = itemView.findViewById(R.id.textBusdestinationcity);
            textBusArrivaltime = itemView.findViewById(R.id.textBusArrivaltime);
            textBusDeparturetime = itemView.findViewById(R.id.textBusDeparturetime);

        }
    }


}


