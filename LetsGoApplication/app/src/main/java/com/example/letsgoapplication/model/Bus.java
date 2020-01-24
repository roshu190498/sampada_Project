package com.example.letsgoapplication.model;

import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

public class Bus implements Serializable {
    String bus_no;
    String bus_name;
    int no_of_seats;
    int price;
    String arrival_time;
    String departure_time;
    Time duration;
    int driver_id;
    String bus_type;
    String source_city_name;
    String destination_city_name;

    public Bus() {}

    public Bus(String bus_no, String bus_name, int no_of_seats, int price, String arrival_time, String departure_time, Time duration, int driver_id, String bus_type, String source_city_name, String destination_city_name) {
        this.bus_no = bus_no;
        this.bus_name = bus_name;
        this.no_of_seats = no_of_seats;
        this.price = price;
        this.arrival_time = arrival_time;
        this.departure_time = departure_time;
        this.duration = duration;
        this.driver_id = driver_id;
        this.bus_type = bus_type;
        this.source_city_name = source_city_name;
        this.destination_city_name = destination_city_name;
    }

    public Bus(String bus_no, String bus_name, int price, String arrival_time, String departure_time, String bus_type, String source_city_name, String destination_city_name) {
        this.bus_no = bus_no;
        this.bus_name = bus_name;
        this.price = price;
        this.arrival_time = arrival_time;
        this.departure_time = departure_time;
        this.bus_type = bus_type;
        this.source_city_name = source_city_name;
        this.destination_city_name = destination_city_name;

    }


    public String getBus_no() {
        return bus_no;
    }

    public String getBus_name() {
        return bus_name;
    }

    public int getNo_of_seats() {
        return no_of_seats;
    }

    public int getPrice() {
        return price;
    }

    public String getArrival_time() {
        return arrival_time;
    }

    public String getDeparture_time() {
        return departure_time;
    }

    public Time getDuration() {
        return duration;
    }

    public int getDriver_id() {
        return driver_id;
    }

    public String getBus_type() {
        return bus_type;
    }

    public String getSource_city_name() {
        return source_city_name;
    }

    public String getDestination_city_name() {
        return destination_city_name;
    }

    public void setBus_no(String bus_no) {
        this.bus_no = bus_no;
    }

    public void setBus_name(String bus_name) {
        this.bus_name = bus_name;
    }

    public void setNo_of_seats(int no_of_seats) {
        this.no_of_seats = no_of_seats;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setArrival_time(String arrival_time) {
        this.arrival_time = arrival_time;
    }

    public void setDeparture_time(String departure_time) {
        this.departure_time = departure_time;
    }

    public void setDuration(Time duration) {
        this.duration = duration;
    }

    public void setDriver_id(int driver_id) {
        this.driver_id = driver_id;
    }

    public void setBus_type(String bus_type) {
        this.bus_type = bus_type;
    }

    public void setSource_city_name(String source_city_name) {
        this.source_city_name = source_city_name;
    }

    public void setDestination_city_name(String destination_city_name) {
        this.destination_city_name = destination_city_name;
    }

}
