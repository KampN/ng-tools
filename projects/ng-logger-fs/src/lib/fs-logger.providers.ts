import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {FullstoryProvider} from './accessors/fullstory';

export function fsLoggerProviders(): EnvironmentProviders {
	return makeEnvironmentProviders([
		FullstoryProvider
	]);
}
