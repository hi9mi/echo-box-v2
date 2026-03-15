package library

import (
	"io/fs"
	"path/filepath"
	"strings"
)

var audioExtensions = map[string]bool{
	".mp3": true,
	// ".flac": true,
	// ".wav":  true,
	// ".ogg":  true,
	// ".m4a":  true,
}

func ScanFolder(folder string) ([]string, error) {
	var files []string

	err := filepath.WalkDir(folder, func(path string, dir fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if dir.IsDir() {
			return nil
		}

		ext := strings.ToLower(filepath.Ext(path))

		if audioExtensions[ext] {
			files = append(files, path)
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return files, nil
}
