import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "src/app/_models/appstate";

export const selectAuthenticatedState = createFeatureSelector<AuthState>('authencticateState');

export const selectAuthenticatedSlice = createSelector(selectAuthenticatedState, state => state )