import { writable, derived, get } from "svelte/store";
import Papa from "papaparse";
import type { Project } from "../../types.js";

// Unified state interface
interface AppState {
  loading: boolean;
  error: string | null;

  // UI state
  selectedCategory: string | null;
  showGallery: boolean;
  galleryVisible: boolean;
  showProjectsList: boolean;
  // Project data
  projects: Project[];
  selectedProjectIndex?: number;
  lightboxImage?: string;
}

// Create unified writable store
export const appState = writable<AppState>({
  // Project data
  projects: [],
  loading: false,
  error: null,

  // UI state
  selectedCategory: null,
  showGallery: false,
  galleryVisible: false,
  showProjectsList: false,
  selectedProjectIndex: undefined,
});

// Derived stores for convenience
export const projects = derived(appState, ($state) => $state.projects);
export const loading = derived(appState, ($state) => $state.loading);
export const error = derived(appState, ($state) => $state.error);
export const selectedProject = derived(
  appState,
  ($state) => $state.selectedCategory
);
export const isGalleryOpen = derived(appState, ($state) => $state.showGallery);
export const galleryVisible = derived(
  appState,
  ($state) => $state.galleryVisible
);
export const showProjectsList = derived(
  appState,
  ($state) => $state.showProjectsList
);

export const projectsInSelectedCategory = derived(appState, ($state) => {
  console.log($state.selectedCategory?.toUpperCase());
  const sel = $state.projects.filter(
    (p: Project) =>
      p.category?.toUpperCase() === $state.selectedCategory?.toUpperCase()
  );
  console.log(sel);
  return sel;
});

// Derived store for unique categories
export const uniqueCategories = derived(projects, ($projects: Project[]) => {
  const categories = new Set<string>();

  $projects.forEach((project: Project) => {
    if (project.category && typeof project.category === "string") {
      // Split by comma and trim whitespace in case there are multiple categories
      const projectCategories = project.category
        .split(",")
        .map((cat: string) => cat.trim());
      projectCategories.forEach((cat: string) => {
        if (cat) categories.add(cat);
      });
    }
  });

  return Array.from(categories);
});

// URL utility functions
function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

function slugToCategory(slug: string): string {
  // Convert slug back to title case
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Actions
class ProjectStoreActions {
  // Data fetching
  async fetchProjects(sheetUrl: string) {
    appState.update((state: AppState) => ({
      ...state,
      loading: true,
      error: null,
    }));

    try {
      const projects = (await this.fetchSheet(sheetUrl)).map((p) => ({
        ...p,
        //@ts-ignore
        Image_Sizes: JSON.parse(p.Image_Sizes),
      }));

      console.log(projects);
      appState.update((state: AppState) => ({
        ...state,
        projects,
        loading: false,
      }));

      // Initialize category from current URL after projects are loaded
      this.initializeFromCurrentUrl();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      appState.update((state: AppState) => ({
        ...state,
        loading: false,
        error: errorMessage,
        projects: [],
      }));
    }
  }

  private fetchSheet(sheet_url: string): Promise<Project[]> {
    function parseData(
      url: string,
      sheetTitle: string
    ): Promise<{ rows: any; sheetTitle: string }> {
      return new Promise((resolve, reject) => {
        Papa.parse(url, {
          download: true,
          header: true,
          delimiter: ",",
          dynamicTyping: true,
          complete: (results: any) => {
            resolve({ rows: results, sheetTitle: sheetTitle });
          },
          error: (error: any) => {
            reject(error);
          },
        });
      });
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheet_url}/export?format=csv&gid=0`;
    return parseData(csvUrl, "assets").then(
      (response) => response.rows.data as Project[]
    );
  }

  // Project selection
  selectCategory(category: string, updateUrl: boolean = true) {
    console.log("SELECTING CATEGORY");
    appState.update((state: AppState) => ({
      ...state,
      selectedCategory: category,
      showGallery: true,
      showProjectsList: false,
    }));

    // Update URL if requested (default behavior)
    if (updateUrl && typeof window !== "undefined") {
      const slug = categoryToSlug(category);
      const url = new URL(window.location.href);
      url.searchParams.set("category", slug);
      window.history.pushState({ category }, "", url.toString());
    }
  }

  // Initialize category from URL parameter
  initializeCategoryFromParam(
    categorySlug: string,
    availableCategories: string[]
  ) {
    if (!categorySlug) return;

    // Try to match slug to available categories
    const potentialCategory = slugToCategory(categorySlug);

    // Find exact match or closest match
    const matchedCategory = availableCategories.find(
      (cat) =>
        categoryToSlug(cat) === categorySlug ||
        cat.toLowerCase() === potentialCategory.toLowerCase()
    );

    if (matchedCategory) {
      // Select category but don't update URL (we're already at the right URL)
      this.selectCategory(matchedCategory, false);
    }
  }

  // Add this new method to handle initial page load
  initializeFromCurrentUrl() {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const categoryParam = url.searchParams.get("category");

    if (!categoryParam) return;

    // Get current available categories
    const currentState = get(appState);
    const categories = new Set<string>();

    currentState.projects.forEach((project: Project) => {
      if (project.category && typeof project.category === "string") {
        const projectCategories = project.category
          .split(",")
          .map((cat: string) => cat.trim());
        projectCategories.forEach((cat: string) => {
          if (cat) categories.add(cat);
        });
      }
    });

    const availableCategories = Array.from(categories);
    this.initializeCategoryFromParam(categoryParam, availableCategories);
  }

  // Gallery management
  showProjectGallery() {
    appState.update((state: AppState) => ({
      ...state,
      showProjectsList: true,
      showGallery: false,
    }));
  }

  setLightBoxImage(id: string) {
    appState.update((state) => ({
      ...state,
      lightboxImage: id,
    }));
  }
  closeGallery() {
    appState.update((state: AppState) => ({
      ...state,
      showGallery: false,
      galleryVisible: false,
      selectedCategory: null,
      showProjectsList: true,
    }));

    // Remove category parameter from URL when closing gallery
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      window.history.pushState({}, "", url.toString());
    }
  }

  setGalleryVisible(visible: boolean) {
    appState.update((state: AppState) => ({
      ...state,
      galleryVisible: visible,
    }));
  }

  // Helper method to get current projects
  private getCurrentProjects(): Project[] {
    let currentProjects: Project[] = [];
    appState.subscribe((state: AppState) => {
      currentProjects = state.projects;
    })();
    return currentProjects;
  }

  // Reset all state
  reset() {
    appState.set({
      // Project data
      projects: [],
      loading: false,
      error: null,

      // UI state
      selectedCategory: null,
      showGallery: false,
      galleryVisible: false,
      showProjectsList: false,
    });
  }
}

// Export store actions
export const projectActions = new ProjectStoreActions();

// Export convenience methods for common operations
export const loadProjects = (sheetUrl: string) =>
  projectActions.fetchProjects(sheetUrl);
export const selectCategory = (category: string, updateUrl?: boolean) =>
  projectActions.selectCategory(category, updateUrl);
export const initializeCategoryFromParam = (
  slug: string,
  availableCategories: string[]
) => projectActions.initializeCategoryFromParam(slug, availableCategories);
export const initializeFromCurrentUrl = () =>
  projectActions.initializeFromCurrentUrl();
export const showGallery = () => projectActions.showProjectGallery();
export const closeGallery = () => projectActions.closeGallery();
export const setGalleryVisible = (visible: boolean) =>
  projectActions.setGalleryVisible(visible);
export const setLightboxImage = (id: string) =>
  projectActions.setLightBoxImage(id);
// Export utility functions
export { categoryToSlug, slugToCategory };
