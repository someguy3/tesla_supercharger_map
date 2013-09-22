package com.redshiftsoft.tesla.model;

import java.util.List;

public class GeoLocateResponse {

    private List<GeoLocateResult> results;

    private String status;

    @Override
    public String toString() {
        return "GeoLocateResponse{" +
                "results=" + results +
                ", status='" + status + '\'' +
                '}';
    }

    public List<GeoLocateResult> getResults() {
        return results;
    }

    public void setResults(List<GeoLocateResult> results) {
        this.results = results;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
