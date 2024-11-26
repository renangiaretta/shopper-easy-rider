import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EstimateRideDto } from 'src/modules/ride/dto/estimate-ride.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RouteUtils {
	constructor(private httpService: HttpService) {}
	async getRouteData(estimateRideDto: EstimateRideDto) {
		const url: string =
			'https://routes.googleapis.com/directions/v2:computeRoutes';
		return await firstValueFrom(
			this.httpService.post(
				url,
				{
					origin: { address: estimateRideDto.origin },
					destination: { address: estimateRideDto.destination },
					travelMode: 'DRIVE',
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
						'X-Goog-FieldMask':
							'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs.start_location,routes.legs.end_location',
					},
				},
			),
		);
	}

	buildRouteDetails(response: any, driverOptionsWithFares: any): any {
		return {
			origin: {
				latitude:
					response.data.routes[0].legs[0].startLocation.latLng
						.latitude,
				longitude:
					response.data.routes[0].legs[0].startLocation.latLng
						.longitude,
			},
			destination: {
				latitude:
					response.data.routes[0].legs[0].endLocation.latLng.latitude,
				longitude:
					response.data.routes[0].legs[0].endLocation.latLng
						.longitude,
			},
			distance: response.data.routes[0].distanceMeters,
			duration: response.data.routes[0].duration,
			options: driverOptionsWithFares,
			routeResponse: response.data,
		};
	}
}
