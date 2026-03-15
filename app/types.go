package app

type ScanProgress struct {
	Current int    `json:"current"`
	Total   int    `json:"total"`
	Path    string `json:"path"`
}

type ScanStarted struct {
	Total int `json:"total"`
}

type ScanFinished struct {
	Total   int `json:"total"`
	Success int `json:"success"`
}

type ScanFailed struct {
	Error string `json:"error"`
}
