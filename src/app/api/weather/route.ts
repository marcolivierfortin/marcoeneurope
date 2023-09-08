import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { WeatherApi, WeatherInterface } from '../../../interfaces';

export async function POST(request: NextRequest): Promise<NextResponse<WeatherInterface | string>> {
  try {
    // Get parameters from JSON body.
    const parameters = await request.json();

    if (typeof parameters.city === 'string') {
      // Fetch data from Weather API.
      const api = await fetch(`https://api.weatherapi.com/v1/current.json?key=${ process.env.WEATHER_API }&q=${ parameters.city }`);

      if (api.status === 200) {
        const data: WeatherApi = await api.json();

        // Return the weather.
        return NextResponse.json({
          city: data.location.name,
          region: data.location.region,
          country: data.location.country,
          conditionText: data.current.condition.text,
          conditionCode: data.current.condition.code,
          isDay: !!data.current.is_day,
          celsius: data.current.temp_c,
          fahrenheit: data.current.temp_f,
        } as WeatherInterface);
      }
    }
  }
  catch (exception) {
    return NextResponse.json('There is an unexpected error, see manual for details.', {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  return NextResponse.json('The "city" parameter is missing or invalid.', {
    status: StatusCodes.UNPROCESSABLE_ENTITY,
  });
}
