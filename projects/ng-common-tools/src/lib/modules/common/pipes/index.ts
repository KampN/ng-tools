import {Type} from '@angular/core';
import {UCFirstPipe} from './ucfirst';
import {PrependPipe} from './prepend';
import {AppendPipe} from './append';
import {CoalescePipe} from './coalesce';
import {PadStartPipe} from './pad-start';
import {PadEndPipe} from './pad-end';
import {ShortNumberPipe} from './short-number';

export const Pipes: Type<any>[] = [
    UCFirstPipe,
    PrependPipe,
    AppendPipe,
    CoalescePipe,
    PadStartPipe,
    PadEndPipe,
    ShortNumberPipe
];
