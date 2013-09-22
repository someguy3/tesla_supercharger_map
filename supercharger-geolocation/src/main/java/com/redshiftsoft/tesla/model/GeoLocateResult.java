package com.redshiftsoft.tesla.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class GeoLocateResult {

    @SerializedName("address_components")
    private List<AddressComponent> addressComponents;

    @SerializedName("formatted_address")
    private String formattedAddress;

    private Geometry geometry;

    private List<String> types;

    @Override
    public String toString() {
        return "GeoLocateResult{" +
                "addressComponents=" + addressComponents +
                ", formattedAddress='" + formattedAddress + '\'' +
                ", geometry=" + geometry +
                ", types=" + types +
                '}';
    }

    public List<AddressComponent> getAddressComponents() {
        return addressComponents;
    }

    public void setAddressComponents(List<AddressComponent> addressComponents) {
        this.addressComponents = addressComponents;
    }

    public String getFormattedAddress() {
        return formattedAddress;
    }

    public void setFormattedAddress(String formattedAddress) {
        this.formattedAddress = formattedAddress;
    }

    public Geometry getGeometry() {
        return geometry;
    }

    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }
}
