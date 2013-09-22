package com.redshiftsoft.tesla.model;

import com.google.gson.annotations.SerializedName;

public class Geometry {

    private Location location;

    @SerializedName("location_type")
    private String locationType;

    private Viewport viewport;

    @Override
    public String toString() {
        return "Geometry{" +
                "viewport=" + viewport +
                ", locationType='" + locationType + '\'' +
                ", location=" + location +
                '}';
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getLocationType() {
        return locationType;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public Viewport getViewport() {
        return viewport;
    }

    public void setViewport(Viewport viewport) {
        this.viewport = viewport;
    }
}
