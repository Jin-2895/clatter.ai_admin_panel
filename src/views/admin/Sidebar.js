// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { createAdminAction, updateAdminAction } from '../../redux/createAdmin/adminAction'

const defaultValues = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
            if (key === 'email' && !emailRegex.test(data[key])) {
                return false;
            }
        }
    }

    return true;
};

const SidebarNewAdmin = ({ open, toggleSidebar, editAdminProfile, setEditAdminProfile, adminProfileData }) => {
    // ** Store Vars
    const dispatch = useDispatch()

    useEffect(() => {
        if (adminProfileData) {
            setValue("firstName", adminProfileData.firstName)
            setValue("lastName", adminProfileData.lastName)
            setValue("userName", adminProfileData.userName)
            setValue("email", adminProfileData.email)
        }
    }, [adminProfileData])

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
        const emailRegex = /^[a-zA-Z0-9._-]+@clatter\.com$/;

        if (checkIsValid(data, passwordRegex, emailRegex)) {
            debugger
            const formData = new FormData()
            formData.append("firstName", data.firstName)
            formData.append("lastName", data.lastName)
            formData.append("email", data.email)
            formData.append("userName", data.userName)
            formData.append("password", data.password)
            if (adminProfileData.id) {
                let id = adminProfileData.id
                dispatch(updateAdminAction({ formData, id }))
            } else {
                dispatch(createAdminAction(data));
            }
        } else {
            for (const key in data) {
                if (data[key] === null) {
                    setError(key, {
                        type: 'manual'
                    });
                }
                if (data[key] !== null && data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
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
                if (key === 'email' && !emailRegex.test(data[key])) {
                    setError(key, {
                        type: 'manual'
                    });
                }
            }
        }
    };

    const handleSidebarClosed = () => {
        setEditAdminProfile(!editAdminProfile)
        for (const key in defaultValues) {
            setValue(key, '')
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='New Admin'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='userName'>
                        User Name <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='userName'
                        control={control}
                        render={({ field }) => (
                            <Input
                                defaultValue={editAdminProfile}
                                id='userName'
                                placeholder='john.doe'
                                invalid={errors.userName && true}
                                {...field}
                            />
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
                            <Input
                                id='firstName'
                                defaultValue={adminProfileData ? adminProfileData.firstName : ''}
                                placeholder='john'
                                invalid={errors.firstName && true}
                                {...field}
                            />
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
                            <Input
                                id='lastName'
                                defaultValue={adminProfileData ? adminProfileData.lastName : ''}
                                placeholder='doe'
                                invalid={errors.lastName && true}
                                {...field}
                            />
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
                                disabled={adminProfileData?.email ? true : false}
                                id='email'
                                defaultValue={adminProfileData ? adminProfileData.email : ''}
                                placeholder='john.doe@clatter.com'
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
                <Button type='submit' className='me-1' color='primary'>
                    Submit
                </Button>
                <Button type='button' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarNewAdmin
