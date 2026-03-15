package domain

type PlayerState struct {
	CurrentTrackID string  `json:"currentTrackId"`
	IsPlaying      bool    `json:"isPlaying"`
	Position       float64 `json:"position"`
	Duration       float64 `json:"duration"`
	Volume         float64 `json:"volume"`
}
