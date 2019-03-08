import {getMultipleValuesInSingleSelectionError, SelectionModel} from './selection';
import {DummyMockFactory} from '../../../../../ng-common-tools/src/lib/mockFactories/dummy';

describe('Collections : SelectionModel', () => {
    describe('single selection', () => {
        let model: SelectionModel<any>;

        beforeEach(() => model = new SelectionModel());

        it('should be able to select a single value', () => {
            model.select(1);

            expect(model.selected.length).toBe(1);
            expect(model.isSelected(1)).toBe(true);
        });

        it('should deselect the previously selected value', () => {
            model.select(1);
            model.select(2);

            expect(model.isSelected(1)).toBe(false);
            expect(model.isSelected(2)).toBe(true);
        });

        it('should throw an error if multiple values are passed to model', () => {
            expect(() => model.select(1, 2)).toThrow(getMultipleValuesInSingleSelectionError());
        });

        it('should only preselect one value', () => {
            model = new SelectionModel(false, [1, 2]);

            expect(model.selected.length).toBe(1);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(false);
        });
    });

    describe('multiple selection', () => {
        let model: SelectionModel<any>;

        beforeEach(() => model = new SelectionModel(true));

        it('should be able to select multiple options', () => {
            const changedSpy = jasmine.createSpy('changed spy');

            model.changed.subscribe(changedSpy);
            model.select(1);
            model.select(2);

            expect(model.selected.length).toBe(2);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(true);
            expect(changedSpy).toHaveBeenCalledTimes(2);
        });

        it('should be able to select multiple options at the same time', () => {
            const changedSpy = jasmine.createSpy('changed spy');

            model.changed.subscribe(changedSpy);
            model.select(1, 2);

            expect(model.selected.length).toBe(2);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(true);
            expect(changedSpy).toHaveBeenCalledTimes(1);
        });

        it('should be able to preselect multiple options', () => {
            model = new SelectionModel(true, [1, 2]);

            expect(model.selected.length).toBe(2);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(true);
        });

        it('should be able to sort the selected values', () => {
            model = new SelectionModel(true, [2, 3, 1]);

            expect(model.selected).toEqual([2, 3, 1]);

            model.sort();

            expect(model.selected).toEqual([1, 2, 3]);
        });

        it('should sort values if `selected` has not been accessed before', () => {
            model = new SelectionModel(true, [2, 3, 1]);

            // Important: don't assert `selected` before sorting so the getter isn't invoked
            model.sort();
            expect(model.selected).toEqual([1, 2, 3]);
        });
    });

    describe('changed event', () => {
        it('should return the model that dispatched the event', () => {
            const model = new SelectionModel();
            const spy = jasmine.createSpy('SelectionModel change event');

            model.changed.subscribe(spy);
            model.select(1);

            const event = spy.calls.mostRecent().args[0];

            expect(spy).toHaveBeenCalled();
            expect(event.source).toBe(model);
        });

        it('should return both the added and removed values', () => {
            const model = new SelectionModel();
            const spy = jasmine.createSpy('SelectionModel change event');

            model.select(1);

            model.changed.subscribe(spy);

            model.select(2);

            const event = spy.calls.mostRecent().args[0];

            expect(spy).toHaveBeenCalled();
            expect(event.removed).toEqual([1]);
            expect(event.added).toEqual([2]);
        });

        it('should have updated the selected value before emitting the change event', () => {
            const model = new SelectionModel(true);
            const spy = jasmine.createSpy('SelectionModel change event');

            // Note: this assertion is only here to run the getter.
            expect(model.selected).toEqual([]);

            model.changed.subscribe(() => spy(model.selected));
            model.select(1);

            expect(spy).toHaveBeenCalledWith([1]);
        });

        describe('selection', () => {
            let model: SelectionModel<any>;
            let spy: jasmine.Spy;

            beforeEach(() => {
                model = new SelectionModel(true);
                spy = jasmine.createSpy('SelectionModel change event');

                model.changed.subscribe(spy);
            });

            it('should emit an event when a value is selected', () => {
                model.select(1);

                const event = spy.calls.mostRecent().args[0];

                expect(spy).toHaveBeenCalled();
                expect(event.added).toEqual([1]);
                expect(event.removed).toEqual([]);
            });

            it('should not emit multiple events for the same value', () => {
                model.select(1);
                model.select(1);

                expect(spy).toHaveBeenCalledTimes(1);
            });

            it('should not emit an event when preselecting values', () => {
                model = new SelectionModel(false, [1]);
                spy = jasmine.createSpy('SelectionModel initial change event');
                model.changed.subscribe(spy);

                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('deselection', () => {
            let model: SelectionModel<any>;
            let spy: jasmine.Spy;

            beforeEach(() => {
                model = new SelectionModel(true, [1, 2, 3]);
                spy = jasmine.createSpy('SelectionModel change event');

                model.changed.subscribe(spy);
            });

            it('should emit an event when a value is deselected', () => {
                model.deselect(1);

                let event = spy.calls.mostRecent().args[0];

                expect(spy).toHaveBeenCalled();
                expect(event.removed).toEqual([1]);
            });

            it('should not emit an event when a non-selected value is deselected', () => {
                model.deselect(4);
                expect(spy).not.toHaveBeenCalled();
            });

            it('should emit a single event when clearing all of the selected options', () => {
                model.clear();

                let event = spy.calls.mostRecent().args[0];

                expect(spy).toHaveBeenCalledTimes(1);
                expect(event.removed).toEqual([1, 2, 3]);
            });

        });
    });

    describe('disabling the change event', () => {
        let model: SelectionModel<any>;

        beforeEach(() => {
            model = new SelectionModel(true, undefined, (v) => v, false);
        });

        it('should still update the select value', () => {
            model.select(1);
            expect(model.selected).toEqual([1]);

            model.select(2);
            expect(model.selected).toEqual([1, 2]);
        });
    });

    describe('change extractId fn', () => {
        let model: SelectionModel<any>;
        const dummyFactory: DummyMockFactory = new DummyMockFactory();

        beforeEach(() => {
            model = new SelectionModel(true, undefined, (v) => v.id);
        });

        it('should be able to select a multiple values', () => {
            const dummies = dummyFactory.sperm(2);
            model.select(...dummies);
            expect(model.selected.length).toBe(2);
            expect(model.isSelected(dummies[0])).toBe(true);
            expect(model.isSelected(dummies[1])).toBe(true);
        });

        it('should be able to determine if an object with another reference is selected by using the extractIdFn', () => {
            const dummy = dummyFactory.seed();
            model.select(dummy);
            expect(model.selected.length).toBe(1);
            expect(model.isSelected(dummy)).toBe(true);
            expect(model.isSelected({id: dummy.id})).toBe(true);
        });

        it('should deselect the previously selected value even if the reference changed', () => {
            const dummy = dummyFactory.seed({id: 1});
            model.select(dummyFactory.seed(dummy));
            model.deselect(dummyFactory.seed({id: 1}));

            expect(model.selected.length).toBe(0);
            expect(model.isSelected(dummy)).toBe(false);
        });

        it('should set the extractIdFn and remap the selected values', () => {
            const dummies = dummyFactory.sperm(5);
            model.select(...dummies);

            expect(model.selected.length).toBe(5);
            expect(model.isSelected({id: dummies[0].id})).toBe(true);

            model.setExtractIdFn((v) => v);

            expect(model.selected.length).toBe(5);
            expect(model.isSelected({id: dummies[0].id})).toBe(false);

            model.setExtractIdFn((v) => v.id);

            expect(model.selected.length).toBe(5);
            expect(model.isSelected({id: dummies[0].id})).toBe(true);
        });

    });

    it('should be able to determine whether it is empty', () => {
        const model = new SelectionModel();

        expect(model.isEmpty()).toBe(true);

        model.select(1);

        expect(model.isEmpty()).toBe(false);
    });

    it('should be able to determine whether it has a value', () => {
        const model = new SelectionModel();

        expect(model.hasValue()).toBe(false);

        model.select(1);

        expect(model.hasValue()).toBe(true);
    });

    it('should be able to toggle an option', () => {
        const model = new SelectionModel();

        model.toggle(1);
        expect(model.isSelected(1)).toBe(true);

        model.toggle(1);
        expect(model.isSelected(1)).toBe(false);
    });

    it('should be able to clear the selected options', () => {
        const model = new SelectionModel(true);

        model.select(1);
        model.select(2);

        expect(model.selected.length).toBe(2);

        model.clear();

        expect(model.selected.length).toBe(0);
        expect(model.isEmpty()).toBe(true);
    });

    it('should be empty if an empty array is passed for the preselected values', () => {
        expect(new SelectionModel(false, []).selected).toEqual([]);
    });

    it('should be able to determine whether multiple values can be selected', () => {
        const multipleSelectionModel = new SelectionModel(true);
        expect(multipleSelectionModel.isMultipleSelection()).toBe(true);

        const singleSelectionModel = new SelectionModel();
        expect(singleSelectionModel.isMultipleSelection()).toBe(false);
    });
});
