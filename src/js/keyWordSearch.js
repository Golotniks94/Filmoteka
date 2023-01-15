import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
// import { BASE_URL } from './apiServis.js';
// import { KEY } from './apiServis.js';
const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `c54d78350d3df927165feb0aabc91c13`;

export default class MoviesApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.lang = '';
    this.genre = '';
    this.year = '';
    this.originalLanguage = '';
    this.vote = '';
  }

// Популярні фільми
  async getPopularMovies() {
    try {
      const url = `${BASE_URL}movie/popular?api_key=${KEY}&language=${this.lang}&page=${this.page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

// Тренди тижня   
  async getTrendMovies() {
    try {
      const url = `${BASE_URL}trending/movie/week?api_key=${KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

  async getMoviesByKey() {
    try {
      const searchParams = new URLSearchParams({
        api_key: 'c54d78350d3df927165feb0aabc91c13',
        query: this.searchQuery,
        language: 'en-US',
        page: this.page,
        include_adult: false,
      });
      const url = `${BASE_URL}search/movie?${searchParams}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }
// Повна інформація про фільм
  async getMovieDetails(id) {
    try {
      const url = `${BASE_URL}movie/${id}?api_key=${KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

// Можливий трейлер
  async getMovieVideo(id) {
    try {
      const url = `${BASE_URL}movie/${id}/videos?api_key=${KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      Notify.failure('Oops, an error occurred');
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  setLang(newLang) {
    this.lang = newLang;
  }

  getLang() {
    return this.lang;
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
}