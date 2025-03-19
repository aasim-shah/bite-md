import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

const PlaceSuggestionInput = () => {
  const [searchKey, setSearchKey] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchKey.length > 2) {
      setLoading(true);
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchKey}&key=${GOOGLE_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPredictions(data.predictions || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
          setLoading(false);
        });
    } else {
      setPredictions([]);
    }
  }, [searchKey]);

  return (
    <div style={{ position: "relative" }}>
      <TextField
        fullWidth
        label="Search Places"
        variant="outlined"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      {loading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
          }}
        />
      )}
      {predictions.length > 0 && (
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 10,
            marginTop: 5,
          }}
        >
          <List>
            {predictions.map((place) => (
              <ListItem
                button
                key={place.place_id}
                onClick={() => {
                  setSearchKey(place.description);
                  setPredictions([]);
                }}
              >
                <ListItemText primary={place.description} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default PlaceSuggestionInput;
