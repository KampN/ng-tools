import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
	selector: 'gads-image',
	templateUrl: './gads-image.html',
	styleUrls: ['./gads-image.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[style.--image-url]': 'imageUrl',
		'[style.--image-height]': 'heightPx',
		'[style.--image-width]': 'widthPx',
	}
})
export class GadsImageComponent {

	@Input() image: string;

	get imageUrl(): string | null {
		return this.image ? `url(${this.image})` : null;
	}

	protected _height: number = null;

	get height(): number {return this._height;}

	@Input() set height(val: number) {this._height = coerceNumberProperty(val);}

	get heightPx(): string {return `${this._height}px`;}

	get widthPx(): string {return `${this._width}px`;}

	protected _width: number = null;

	get width(): number {return this._width;}

	@Input() set width(val: number) {this._width = coerceNumberProperty(val);}
}
