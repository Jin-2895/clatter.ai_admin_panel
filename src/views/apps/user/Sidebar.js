// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, FormFeedback } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { addNewUserAction } from '../../../redux/user/userAction'

const defaultValues = {
  email: '',
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  phoneNumber: ''
}

const checkIsValid = (data, passwordRegex, emailRegex) => {
  for (const key in data) {
    if (typeof data[key] === 'object') {
      if (data[key] === null) {
        return false;
      }
    } else if (typeof data[key] === 'string') {
      if (data[key].length === 0) {
        return false;
      }

      if (key === 'password' && (!passwordRegex.test(data[key]) || data[key].length < 8)) {
        return false;
      }
      if (key === 'phoneNumber' && (data[key].length < 10 || data[key].length > 16)) {
        return false;
      }
      if (key === 'email' && !emailRegex.test(data[key])) {
        return false;
      }
    }
  }

  return true;
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (checkIsValid(data, passwordRegex, emailRegex)) {
      dispatch(addNewUserAction(data));
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError(key, {
            type: `${key} is required`
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: `${key} is required`
          });
        }
        if (key === 'password' && (!passwordRegex.test(data[key]))) {
          setError(key, {
            type: 'Password must contain letters, numbers & periods'
          });
        }
        if (key === 'password' && (data[key].length < 8)) {
          setError(key, {
            type: 'Password should be 8 characters or more'
          })
        }
        if (key === 'phoneNumber' && (data[key].length < 10 || data[key].length > 16)) {
          setError(key, {
            type: 'Please check your contact number'
          });
        }
        if (key === 'email' && !emailRegex.test(data[key])) {
          setError(key, {
            type: `Email doesn't not qualify standard`
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='userName'>
            Username <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='userName'
            control={control}
            render={({ field }) => (
              <Input id='userName' placeholder='johnDoe99' invalid={errors.userName && true} {...field} />
            )}
          />
          {errors.userName && (
            <FormText color='danger'>{errors.userName.type}</FormText>
          )}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='firstName'>
            First Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input id='firstName' placeholder='John' invalid={errors.firstName && true} {...field} />
            )}
          />
          {errors.firstName && (
            <FormText color='danger'>{errors.firstName.type}</FormText>
          )}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='lastName'>
            Last Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input id='lastName' placeholder='Doe' invalid={errors.lastName && true} {...field} />
            )}
          />
          {errors.lastName && (
            <FormText color='danger'>{errors.lastName.type}</FormText>
          )}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='email'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          {errors.email && (
            <FormText color='danger'>{errors.email.type}</FormText>
          )}
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                type='password'
                id='password'
                placeholder='********'
                invalid={errors.password && true}
                {...field}
              />
            )}
          />
          {errors.password ? (
            <FormText color='danger'>{errors.password.type}</FormText>
          ) : (
            <FormText color='muted'>You can use letters, numbers & periods</FormText>
          )}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='phoneNumber'>
            Contact <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <Input id='phoneNumber' placeholder='(397) 294-5153' invalid={errors.phoneNumber && true} {...field} />
            )}
          />
          {errors.phoneNumber && (
            <FormText color='danger'>{errors.phoneNumber.type}</FormText>
          )}
        </div>

        <Button type='submit' className='me-1' color='primary'>
          ADD
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>

      </Form>

    </Sidebar>
  )
}

export default SidebarNewUsers
