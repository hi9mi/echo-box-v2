package library

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/dhowden/tag"
)

type Metadata struct {
	Title     string
	Artist    string
	Album     string
	Duration  float64
	CoverData []byte
	CoverMime string
}

func ReadMetadata(path string) (*Metadata, error) {
	result := &Metadata{
		Title:    fileNameWithoutExt(path),
		Artist:   "Unknown Artist",
		Album:    "",
		Duration: 0,
	}

	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	meta, err := tag.ReadFrom(file)
	if err != nil {
		return result, err
	}

	if title := strings.TrimSpace(meta.Title()); title != "" {
		result.Title = title
	}
	if artist := strings.TrimSpace(meta.Artist()); artist != "" {
		result.Artist = artist
	}
	result.Album = meta.Album()

	picture := meta.Picture()
	if picture != nil {
		result.CoverData = picture.Data
		result.CoverMime = picture.MIMEType
	}

	return result, nil
}

func fileNameWithoutExt(path string) string {
	base := filepath.Base(path)
	ext := filepath.Ext(base)
	return strings.TrimSuffix(base, ext)
}
