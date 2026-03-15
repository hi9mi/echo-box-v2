package domain

type Track struct {
	ID        string  `json:"id"`
	Path      string  `json:"path"`
	FileName  string  `json:"fileName"`
	Title     string  `json:"title"`
	Artist    string  `json:"artist"`
	Album     string  `json:"album"`
	Duration  float64 `json:"duration"`
	CoverMime string  `json:"coverMime"`
	CoverData []byte  `json:"coverData"`
}
