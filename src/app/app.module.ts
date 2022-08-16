import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRootComponent} from './_components/app-root/app-root';
import {LoggerModule} from '@kamp-n/ng-logger';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/module';
import {MaterialModule} from './material/module';
import {AppRouting} from './app.routing';
import {Components} from './_components';
import {NavigationRouteProvider} from './navigation';
import {
	GADS_PREVIEW_TRANSLATOR, GADS_PREVIEW_VALUE_FORMATTER, GAdsPreviewTranslator, GAdsPreviewValueFormatter
} from '@kamp-n/gads-preview';

const GAdsPreviewTranslations = {
	'headline': 'Headline',
	'description': 'Description',
	'business_name': 'Business Name',
	'long_headline': 'Long Headline',
	'button.open': 'Open',
	'flag.ad': 'Ad',
	'button.skip_ad': 'Skip Ad',
	'button.learn_more': 'Learn more'
};

function GAdsPreviewTranslatorFactory(): GAdsPreviewTranslator {
	return (value: string) => GAdsPreviewTranslations[value] ?? value;
}

function GAdsPreviewValueFormatterFactory(): GAdsPreviewValueFormatter {
	return (value: string) => `<span>${value}</span>`;
}

@NgModule({
	declarations: [
		...Components
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		AppRouting,

		SharedModule,

		MaterialModule.forRoot(),
		LoggerModule.forRoot(),

	],
	providers: [
		NavigationRouteProvider,
		{
			provide: GADS_PREVIEW_TRANSLATOR,
			useFactory: (GAdsPreviewTranslatorFactory)
		},
		{
			provide: GADS_PREVIEW_VALUE_FORMATTER,
			useFactory: (GAdsPreviewValueFormatterFactory)
		}
	],
	bootstrap: [AppRootComponent]
})
export class AppModule {}

