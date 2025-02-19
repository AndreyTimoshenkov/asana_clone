import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TFilter } from "./filter.model";

export const FilterActions = createActionGroup({
  source: '[Table]',
  events: {
    setFilter: props<{ filterType: TFilter; value: string | Date | null }>(),
    clearFilter: props<{ filterType: TFilter }>(),
    clearAllFilters: emptyProps()
  }
});
