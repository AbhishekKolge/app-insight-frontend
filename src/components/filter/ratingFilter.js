import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const OPERATORS = [
  {
    name: 'Equal To',
    value: 'equals',
  },
  {
    name: 'Less Than',
    value: 'lt',
  },
  {
    name: 'Less Than or Equal',
    value: 'lte',
  },
  {
    name: 'Greater Than',
    value: 'gt',
  },
  {
    name: 'Greater Than or Equal',
    value: 'gte',
  },
];

const customFilterValidationSchema = Yup.object({
  operator: Yup.string().trim().required('Required'),
  value: Yup.number().min(0).required(),
});

const RatingFilter = (props) => {
  const { onAddRating, value, operator } = props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const customFilterFormik = useFormik({
    initialValues: {
      operator: operator || '',
      value: value || '',
    },
    enableReinitialize: true,
    validationSchema: customFilterValidationSchema,
    onSubmit: (values) => {
      onAddRating(values);
      setIsFilterOpen(false);
    },
  });

  const operatorHandler = (value) => {
    customFilterFormik.setFieldValue('operator', value);
  };

  const toggleOpenHandler = (openState) => {
    openState && customFilterFormik.resetForm();
    setIsFilterOpen(openState);
  };

  return (
    <Dialog open={isFilterOpen} onOpenChange={toggleOpenHandler}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 justify-center border-dashed text-xs'
        >
          Rating
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form noValidate onSubmit={customFilterFormik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rating Filter</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 mt-4'>
            <div>
              <Select
                value={customFilterFormik.values.operator}
                onValueChange={operatorHandler}
              >
                <SelectTrigger className='w-full border-dashed'>
                  <SelectValue placeholder='Select Filter Value' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {OPERATORS.map((operator) => {
                      return (
                        <SelectItem key={operator.value} value={operator.value}>
                          {operator.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!!customFilterFormik.touched.operator &&
                !!customFilterFormik.errors.operator && (
                  <p className='text-red-700 text-sm'>
                    {customFilterFormik.errors.operator}
                  </p>
                )}
            </div>
            <div>
              <Input
                className='border-dashed'
                type='number'
                placeholder='Value'
                id='value'
                name='value'
                value={customFilterFormik.values.value}
                onBlur={customFilterFormik.handleBlur}
                onChange={customFilterFormik.handleChange}
              />
              {!!customFilterFormik.touched.value &&
                !!customFilterFormik.errors.value && (
                  <p className='text-red-700 text-sm'>
                    {customFilterFormik.errors.value}
                  </p>
                )}
            </div>

            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingFilter;
