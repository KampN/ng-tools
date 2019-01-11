import {Type} from '@angular/core';
import {UCFirstPipe} from './ucfirst';
import {PrependPipe} from './prepend';
import {AppendPipe} from './append';
import {CoalescePipe} from './coalesce';
import {PadStartPipe} from './padStart';
import {PadEndPipe} from './padEnd';
import {ShortNumberPipe} from './shortNumber';

export const Pipes: Type<any>[] = [
    UCFirstPipe,
    PrependPipe,
    AppendPipe,
    CoalescePipe,
    PadStartPipe,
    PadEndPipe,
    ShortNumberPipe
];
