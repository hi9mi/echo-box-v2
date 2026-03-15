package library

import (
	"path/filepath"

	"echo-box-v2/internal/domain"
)

type ScanFileError struct {
	Path  string `json:"path"`
	Error string `json:"error"`
}

type ScanHooks struct {
	OnStart     func(total int)
	OnProgress  func(current int, total int, path string)
	OnFinish    func(total int, success int)
	OnFileError func(path string, err error)
}

type Service struct {
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Scan(path string, hooks *ScanHooks) ([]domain.Track, error) {
	paths, err := ScanFolder(path)
	if err != nil {
		return nil, err
	}

	total := len(paths)

	if hooks != nil && hooks.OnStart != nil {
		hooks.OnStart(total)
	}

	tracks := make([]domain.Track, 0, total)

	for i, trackPath := range paths {
		meta, err := ReadMetadata(trackPath)
		if err != nil {
			if hooks != nil && hooks.OnFileError != nil {
				hooks.OnFileError(trackPath, err)
			}
			continue
		}

		if hooks != nil && hooks.OnProgress != nil {
			hooks.OnProgress(i+1, total, trackPath)
		}

		track := domain.Track{
			ID:        trackPath,
			Path:      trackPath,
			FileName:  filepath.Base(trackPath),
			Title:     meta.Title,
			Artist:    meta.Artist,
			Album:     meta.Album,
			Duration:  meta.Duration,
			CoverMime: meta.CoverMime,
			CoverData: meta.CoverData,
		}

		tracks = append(tracks, track)
	}

	if hooks != nil && hooks.OnFinish != nil {
		hooks.OnFinish(total, len(tracks))
	}

	return tracks, nil
}
