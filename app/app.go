package app

import (
	"context"
	"echo-box-v2/internal/domain"
	"echo-box-v2/internal/library"
	"fmt"
	"time"

	rt "github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx            context.Context
	libraryService *library.Service
	// queueService   *queue.Service
	// player         *audio.Player
}

// NewApp creates a new App application struct
func NewApp(libraryService *library.Service) *App {
	return &App{
		libraryService: libraryService,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) ScanFolder() ([]domain.Track, error) {
	path, err := rt.OpenDirectoryDialog(a.ctx, rt.OpenDialogOptions{
		Title: "Select Folder",
	})
	if err != nil {
		rt.EventsEmit(a.ctx, ScanFailedEvent, ScanFailed{
			Error: err.Error(),
		})
		return nil, err
	}
	if path == "" {
		// Case when user cancelled the dialog
		return nil, nil
	}

	tracks, err := a.libraryService.Scan(path, &library.ScanHooks{
		OnStart: func(total int) {
			rt.EventsEmit(a.ctx, ScanStartedEvent, ScanStarted{
				Total: total,
			})
		},
		OnProgress: func(current int, total int, path string) {
			// sleep for testing
			time.Sleep(3 * time.Second)
			rt.EventsEmit(a.ctx, ScanProgressEvent, ScanProgress{
				Current: current,
				Total:   total,
				Path:    path,
			})
		},
		OnFinish: func(total int, success int) {
			rt.EventsEmit(a.ctx, ScanFinishedEvent, ScanFinished{
				Total:   total,
				Success: success,
			})
		},
		OnFileError: func(path string, err error) {
			fmt.Printf("failed open/read file:\npath=%s\nerror=%v\n", path, err)
		},
	})
	if err != nil {
		rt.EventsEmit(a.ctx, ScanFailedEvent, ScanFailed{
			Error: err.Error(),
		})
		return nil, err
	}

	return tracks, nil
}
