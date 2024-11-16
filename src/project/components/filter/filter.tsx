import { TCategory, TType, TFiltersData } from '../../types/types';
import { CATEGORIES, CategoryMap, CategoryList, CAMERAS, CamerasMap, CamerasList, LEVELS, LevelMap, LevelsList } from '../../const/const';
import { ChangeEvent, useState } from 'react';

type FilterProps = {
  initialFilters: Partial<TFiltersData>;
  onFeaturesChange: (newData: TFiltersData) => void;
};

function Filter ({ initialFilters, onFeaturesChange}: FilterProps) {
  const INITIAL_FILTERS = {
    category: null,
    types: [],
    levels: [],
  };

  const [ filterData, setFilterData ] = useState<TFiltersData>({
    ...INITIAL_FILTERS,
    ...initialFilters,
  });


  const AvailableTypes: Record<TCategory, TType[]> = {
    [CategoryList.Photocamera]: [
      CamerasList.Collection,
      CamerasList.Digital,
      CamerasList.Film,
      CamerasList.Snapshot
    ],

    [CategoryList.Videocamera]: [
      CamerasList.Collection,
      CamerasList.Digital,
    ],
  };

  const checkIfTypeAvailable = (category: TCategory, type: TType) => {
    AvailableTypes[category].includes(type);
  }; // вовзвращает void а не boolean


  const handleChooseCategory = (category: TCategory) => {
    const newData: TFiltersData = {
      ...filterData,
      category: category,
      types: filterData.types.filter((type) => checkIfTypeAvailable(category, type)), //пустой массив на  выходе
    };

    setFilterData(newData);
    onFeaturesChange(newData);
  };

  const handleChooseType = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = evt.target;
    const type = value as (typeof CamerasList)[keyof typeof CamerasList] ;

    const newData: TFiltersData = {
      ...filterData,
      types: checked
        ? [...filterData.types, type]
        : filterData.types.filter((el) => el !== type),
    };

    setFilterData(newData);
    onFeaturesChange(newData);
  };


  const handleChooseLevel = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked , value } = evt.target;
    const level = value as (typeof LevelsList)[keyof typeof LevelsList];

    const newData: TFiltersData = {
      ...filterData,
      levels: checked
        ? [...filterData.levels, level]
        : filterData.levels.filter((el) => el !== level),
    };

    setFilterData(newData);
    onFeaturesChange(newData);
  };

  return(
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {CATEGORIES.map((category) => (
            <div className="custom-radio catalog-filter__item" key={category}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={category === filterData.category}
                  onChange={() => handleChooseCategory(category)}
                />
                <span className="custom-radio__icon" />
                <span className="custom-radio__label">{CategoryMap[category]}</span>
              </label>
            </div>
          ))}
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {CAMERAS.map((type) => (
            <div className="custom-checkbox catalog-filter__item" key={type}>
              <label>
                <input
                  type="checkbox"
                  name={type}
                  value={type}
                  checked={filterData.types.includes(type)}
                  onChange={handleChooseType}
                  disabled={Boolean(filterData.category && checkIfTypeAvailable(filterData.category, type))}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">{CamerasMap[type]}</span>
              </label>
            </div>
          ))}
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {LEVELS.map((level) => (
            <div className="custom-checkbox catalog-filter__item" key={level}>
              <label>
                <input
                  type="checkbox"
                  name={level}
                  value={level}
                  checked={filterData.levels.includes(level)}
                  onChange={handleChooseLevel}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">{LevelMap[level]}</span>
              </label>
            </div>
          ))}
        </fieldset>

        <button className="btn catalog-filter__reset-btn" type="reset">
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export { Filter };
