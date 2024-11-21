import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TCategory, TType, TFiltersData, TFormInputs, TFilterPriceRange } from '../../types/types';
import { CATEGORIES, CategoryMap, CategoryList, CAMERAS, CamerasMap, CamerasList, LEVELS, LevelMap, LevelsList, INITIAL_FILTERS } from '../../const/const';

type FilterProps = {
  initialFilters: Partial<TFiltersData>;
  onFeaturesChange: (newData: TFiltersData) => void;
  onReset: () => void;
  minPrice: number;
  maxPrice: number;
  initPriceRange: TFilterPriceRange;
  onPricesChange: (inputs: TFilterPriceRange) => void;
};

function Filter ({
  initialFilters,
  onFeaturesChange,
  onReset,
  minPrice,
  maxPrice,
  initPriceRange,
  onPricesChange
}: FilterProps) {
  const [ filterData, setFilterData ] = useState<TFiltersData>({
    ...INITIAL_FILTERS,
    ...initialFilters,
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset
  } = useForm<TFormInputs>({
    mode: 'all',
    defaultValues: {
      priceFrom: initPriceRange[0],
      priceUp: initPriceRange[1]
    }
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

  function checkIfTypeAvailable (category: TCategory, type: TType) {
    return AvailableTypes[category].includes(type);
  }

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

  const watchPriceFrom = Number(watch('priceFrom'));
  const watchPriceUp = Number(watch('priceUp'));

  const handleChangePriceMin = () => {
    let value = watchPriceFrom;

    if(watchPriceFrom < minPrice) {
      value = minPrice;
    } else if(
      watchPriceUp &&
      watchPriceFrom < watchPriceUp
    ){
      value = watchPriceFrom;
    }

    setValue('priceFrom', value);
    onPricesChange([value, watchPriceFrom]);
  };

  const handleChangePriceMax = () => {
    let value = watchPriceUp;

    if(watchPriceUp > maxPrice){
      value = maxPrice;
    } else if (watchPriceFrom &&
      watchPriceUp > watchPriceFrom
    ){
      value = watchPriceUp;
    } else if (watchPriceFrom &&
      watchPriceUp < watchPriceFrom) {
      value = maxPrice;
    }

    setValue('priceUp', value);
    onPricesChange([watchPriceUp, value]);
  };

  const handleClickReset = () => {
    setFilterData(INITIAL_FILTERS);
    onReset();
    reset();
  };

  const handleFormSubmit = (evt: FormEvent) => {
    handleSubmit(() => true)(evt);
  };

  return(
    <div className="catalog-filter">
      <form
        action="#"
        onSubmit={handleFormSubmit}
      >
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  placeholder={
                    Number.isSafeInteger(minPrice)
                      ? minPrice.toString()
                      : undefined
                  }
                  {...register('priceFrom', {
                    onBlur: handleChangePriceMin
                  })}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  placeholder= {
                    Number.isSafeInteger(maxPrice)
                      ? maxPrice.toString()
                      : undefined
                  }
                  {...register('priceUp', {
                    onBlur: handleChangePriceMax
                  })}
                />
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
                  disabled={Boolean(filterData.category && !checkIfTypeAvailable(filterData.category, type))}
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

        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleClickReset}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export { Filter };
