package com.example.letsgoapplication.model;

import java.io.Serializable;

public class Seat implements Serializable {

    String bus_no;
    int seat_no;
    int status;

    public Seat(){}

    public Seat(String bus_no, int seat_no, int status) {
        this.bus_no = bus_no;
        this.seat_no = seat_no;
        this.status = status;
    }

    public String getBus_no() {
        return bus_no;
    }

    public int getSeat_no() {
        return seat_no;
    }

    public void setBus_no(String bus_no) {
        this.bus_no = bus_no;
    }

    public void setSeat_no(int seat_no) {
        this.seat_no = seat_no;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
