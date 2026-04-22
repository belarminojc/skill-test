import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton, CircularProgress, TextField } from '@mui/material';
import type { FormEvent } from 'react';

interface WeatherSearchProps {
  city: string;
  loading: boolean;
  setCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  onLocate: () => void;
}

export function WeatherSearch({ city, loading, setCity, onSearch, onLocate }: WeatherSearchProps) {
  return (
    <section className="mb-10">
      <form onSubmit={onSearch}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter city name"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon className="text-slate-400 mr-2" />,
                  className: "bg-slate-50 rounded-xl",
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              disableElevation
              className="!bg-indigo-700 !rounded-xl !py-3 !px-8 hover:!bg-indigo-800 !normal-case !font-semibold !font-manrope"
              sx={{ flex: { xs: 1, md: 'none' } }}
            >
              {loading ? 'Searching…' : 'Search'}
            </Button>
            <IconButton
              type="button"
              onClick={onLocate}
              className="!bg-indigo-50 !text-indigo-600 !rounded-xl hover:!bg-indigo-100 !p-3"
            >
              <MyLocationIcon />
            </IconButton>
          </div>
        </div>
      </form>

    </section>
  );
}
