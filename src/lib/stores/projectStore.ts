import { writable, derived } from 'svelte/store';
import Papa from 'papaparse';
import type { Project } from '../../types.js';

// State interfaces
interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

interface UIState {
  selectedProject: Project | null;
  showGallery: boolean;
  galleryVisible: boolean;
  showProjectsList: boolean;
}

// Create writable stores
export const projectState = writable<ProjectState>({
  projects: [],
  loading: false,
  error: null
});

export const uiState = writable<UIState>({
  selectedProject: null,
  showGallery: false,
  galleryVisible: false,
  showProjectsList: false
});

// Derived stores for convenience
export const projects = derived(projectState, $state => $state.projects);
export const loading = derived(projectState, $state => $state.loading);
export const error = derived(projectState, $state => $state.error);
export const selectedProject = derived(uiState, $state => $state.selectedProject);
export const isGalleryOpen = derived(uiState, $state => $state.showGallery);
export const galleryVisible = derived(uiState, $state => $state.galleryVisible);
export const showProjectsList = derived(uiState, $state => $state.showProjectsList);

// Actions
class ProjectStoreActions {
  // Data fetching
  async fetchProjects(sheetUrl: string) {
    projectState.update(state => ({ ...state, loading: true, error: null }));
    
    try {
      const projects = await this.fetchSheet(sheetUrl);
      projectState.update(state => ({ ...state, projects, loading: false }));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      projectState.update(state => ({ 
        ...state, 
        loading: false, 
        error: errorMessage, 
        projects: [] 
      }));
    }
  }

  private fetchSheet(sheet_url: string): Promise<Project[]> {
    function parseData(url: string, sheetTitle: string): Promise<{rows: any, sheetTitle: string}> {
      return new Promise((resolve, reject) => {
        Papa.parse(url, {
          download: true,
          header: true,
          delimiter: ',',
          dynamicTyping: true,
          complete: (results: any) => {
            resolve({rows: results, sheetTitle: sheetTitle});
          },
          error: (error: any) => {
            reject(error);
          }
        });
      });
    }
    
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheet_url}/export?format=csv&gid=0`;
    return parseData(csvUrl, "assets").then(response => response.rows.data as Project[]);
  }

  // Project selection
  selectProject(project: Project) {
    uiState.update(state => ({ 
      ...state, 
      selectedProject: project,
      showGallery: true,
      showProjectsList: false
    }));
  }

  // Gallery management
  showProjectGallery() {
    uiState.update(state => ({
      ...state,
      showProjectsList: true,
      showGallery: false
    }));
  }

  closeGallery() {
    uiState.update(state => ({ 
      ...state, 
      showGallery: false,
      galleryVisible: false,
      selectedProject: null,
      showProjectsList: true
    }));
  }

  setGalleryVisible(visible: boolean) {
    uiState.update(state => ({ ...state, galleryVisible: visible }));
  }

  // Helper method to get current projects
  private getCurrentProjects(): Project[] {
    let currentProjects: Project[] = [];
    projectState.subscribe(state => {
      currentProjects = state.projects;
    })();
    return currentProjects;
  }

  // Reset all state
  reset() {
    projectState.set({
      projects: [],
      loading: false,
      error: null
    });
    
    uiState.set({
      selectedProject: null,
      showGallery: false,
      galleryVisible: false,
      showProjectsList: false
    });
  }
}

// Export store actions
export const projectActions = new ProjectStoreActions();

// Export convenience methods for common operations
export const loadProjects = (sheetUrl: string) => projectActions.fetchProjects(sheetUrl);
export const selectProject = (project: Project) => projectActions.selectProject(project);
export const showGallery = () => projectActions.showProjectGallery();
export const closeGallery = () => projectActions.closeGallery();
export const setGalleryVisible = (visible: boolean) => projectActions.setGalleryVisible(visible);
