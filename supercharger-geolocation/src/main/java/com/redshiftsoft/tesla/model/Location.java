package com.redshiftsoft.tesla.model;

public class Location {

    private double lat;
    private double lng;

    @Override
    public String toString() {
        return "Location{" +
                "lat=" + lat +
                ", lon=" + lng +
                '}';
    }

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }
}
