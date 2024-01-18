// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch } from 'react-redux'
import { statusUserAction, updateProfileAction } from '../../../../redux/user/userAction'
import { useParams } from 'react-router-dom'

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  deactivated: 'light-warning',
  inactive: 'light-secondary',
  banned: 'light-danger',
}

const countryOptions = [
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'France', label: 'France' },
  { value: 'Russia', label: 'Russia' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Yemen', label: 'Yemen' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  { value: 'Zimbabwe', label: 'Zimbabwe' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Timor-leste', label: 'Timor-Leste' },
  { value: 'Finland', label: 'Finland' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'China', label: 'China' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Moldova', label: 'Moldova' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'India', label: 'India' },
  { value: 'SanMarino', label: 'San Marino' },
  { value: 'Cameroom', label: 'Cameroom' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'CaboVerde', label: 'Cabo Verde' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Bosnia And Herzegovina', label: 'Bosnia And Herzegovina' },
  { value: 'The Bahamas', label: 'The Bahamas' },
]

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Chinese', label: 'Chinese' },
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser, toggleStateOfModal }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  // ** State
  const [show, setShow] = useState(false)
  const [profileImageObj, setProfileImageObj] = useState({ link: null, obj: '' })

  useEffect(() => {
    if (toggleStateOfModal === true) {
      setShow(!show);
    }
  }, [toggleStateOfModal])

  // ** Hook
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: selectedUser?.firstName !== null ? selectedUser?.firstName : '',
      lastName: selectedUser?.lastName !== null ? selectedUser?.lastName : '',
      userName: selectedUser?.userName !== null ? selectedUser?.userName : '',
      email: selectedUser?.email !== null ? selectedUser?.email : '',
      zipCode: selectedUser?.zipCode !== null ? selectedUser?.zipCode : '',
      companyName: selectedUser?.companyName !== null ? selectedUser?.companyName : '',
      state: selectedUser?.state !== null ? selectedUser?.state : '',
      address: selectedUser?.address !== null ? selectedUser?.address : '',
      profileImage: selectedUser?.profileImage !== null ? selectedUser?.profileImage : '',
      phoneNumber: selectedUser?.phoneNumber !== null ? selectedUser?.phoneNumber : '',
      country: selectedUser?.country !== null ? [{ value: selectedUser?.country, label: selectedUser?.country }] : '',
      language: selectedUser?.language !== null ? [{ value: selectedUser?.language, label: selectedUser?.language }] : ''
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (profileImageObj.link !== null) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={profileImageObj.link}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser?.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser?.firstName || "John Doe"}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const onSubmit = data => {
    if (Object.values(data).every(field =>
      field !== undefined || field.length > 0
    )) {
      const formData = new FormData()
      if ((typeof profileImageObj.obj) === 'object') {
        formData.append("profileImage", profileImageObj.obj)
      } else {
        formData.append('profileImage', profileImageObj.link)
      }
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName)
      formData.append("address", data.address)
      formData.append("zipCode", data.zipCode)
      formData.append("companyName", data.companyName)
      formData.append("state", data.state)
      formData.append("phoneNumber", data.phoneNumber)
      formData.append("country", data.country[0].value)
      formData.append("language", data.language[0].value)
      setShow(false)
      dispatch(updateProfileAction({ id, formData }))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `${key} is required`
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      firstName: selectedUser?.firstName !== null ? selectedUser?.firstName : '',
      lastName: selectedUser?.lastName !== null ? selectedUser?.lastName : '',
      userName: selectedUser?.userName !== null ? selectedUser?.userName : '',
      email: selectedUser?.email !== null ? selectedUser?.email : '',
      zipCode: selectedUser?.zipCode !== null ? selectedUser?.zipCode : '',
      address: selectedUser?.address !== null ? selectedUser?.address : '',
      companyName: selectedUser?.companyName !== null ? selectedUser?.companyName : '',
      state: selectedUser?.state !== null ? selectedUser?.state : '',
      profileImage: selectedUser?.profileImage !== null ? selectedUser?.profileImage : '',
      phoneNumber: selectedUser?.phoneNumber !== null ? selectedUser?.phoneNumber : '',
      country: selectedUser?.country !== null ? [{ value: selectedUser?.country, label: selectedUser?.country }] : '',
      language: selectedUser?.language !== null ? [{ value: selectedUser?.language, label: selectedUser?.language }] : ''
    })
  }

  const handleSuspendedClick = async () => {
    return await MySwal.fire({
      title: 'Are you sure?',
      text: "You will be able to revert user ban!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Ban user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Banned!',
          text: 'User has been Banned.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        let obj = {
          id: id,
          status: "banned"
        }
        dispatch(statusUserAction(obj))
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled Ban :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const handleUnSuspendedClick = async () => {
    return await MySwal.fire({
      title: 'Are you sure?',
      text: "You want to revert user ban!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Unban user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Unbanned!',
          text: 'User has been unbanned.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        let obj = {
          id: id,
          status: "active"
        }
        dispatch(statusUserAction(obj))
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Cancelled unban :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  useEffect(() => {
    if (selectedUser) {
      setValue("firstName", selectedUser?.firstName ?? '')
      setValue("lastName", selectedUser?.lastName ?? '')
      setValue("userName", selectedUser?.userName ?? '')
      setValue("email", selectedUser?.email ?? '')
      setValue("zipCode", selectedUser?.zipCode ?? '')
      setValue('address', selectedUser?.address ?? '')
      setValue("companyName", selectedUser?.companyName ?? '')
      setValue("state", selectedUser?.state ?? '')
      setValue("phoneNumber", selectedUser?.phoneNumber ?? '')
      setValue("profileImage", selectedUser?.profileImage ?? '')
      setValue("language", selectedUser?.language ? [{ value: selectedUser?.language, label: selectedUser?.language }] : '')
      setValue("country", selectedUser?.country ? [{ value: selectedUser?.country, label: selectedUser?.country }] : '')
      setProfileImageObj({ link: selectedUser?.profileImage, obj: '' })
    }
  }, [selectedUser])

  const handleLanguage = (value) => {
    if (!value) {
      return
    }
    if (value.value !== '' && value.label) {
      setValue("language", [{ value: value.value, label: value.label }])
    } else {
      setValue("language", [{ value: value.value, label: value.value }])
    }
  }

  const handleCountry = (value) => {
    if (!value) {
      return
    }
    if (value.value !== '' && value.label) {
      setValue("country", [{ value: value.value, label: value.label }])
    } else {
      setValue("country", [{ value: value.value, label: value.value }])
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const onChange = async (e) => {
    const base64 = await convertToBase64(e.target.files[0])
    setProfileImageObj({ link: base64, obj: e.target.files[0] })
  };

  const resetProfileImage = () => {
    if (selectedUser?.profileImage) {
      setProfileImageObj({ link: selectedUser?.profileImage, obj: null })
    } else {
      setProfileImageObj({ link: null, obj: null })
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{(selectedUser?.firstName + " " + selectedUser?.lastName) ?? ''}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.documentsCreated ?? ''}</h4>
                <small>Total Document Created</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.videosCreated ?? ''}</h4>
                <small>Total Video Created</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Username:</span>
                  <span>{selectedUser?.userName ?? ''}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span> {selectedUser?.email ?? ''}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser?.userStatus]}>
                    {selectedUser?.userStatus ?? ''}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser?.phoneNumber ?? ''}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button type='button' color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            {selectedUser?.userStatus === "active" ? (
              <Button type='button' className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
                Ban
              </Button>
            ) : (
              <Button type='button' className='ms-1' color='danger' outline onClick={handleUnSuspendedClick}>
                Unban
              </Button>
            )}

          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div>
                <div className="d-flex justify-content-around gap-1">
                  <div htmlFor="inputFile">
                    <Label style={{ backgroundColor: "#7367f0", padding: "10px 20px", borderColor: "#7367f0", borderRadius: "5px", fontWeight: "bold", color: "white", cursor: "pointer" }} for="myFile">
                      Upload
                    </Label>
                    <input hidden onChange={onChange} type="file" id="myFile" name="filename" />

                  </div>
                  <div>
                    <Button onClick={() => resetProfileImage()} type="button" color="secondary">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='John'
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      id='lastName'
                      name='lastName'
                      placeholder='Doe'
                      invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='userName'>
                  Username
                </Label>
                <Controller
                  control={control}
                  id='userName'
                  name='userName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled
                      id='userName'
                      name='userName'
                      type="text"
                      placeholder='john.doe.007'
                      invalid={errors.userName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='zipCode'>
                  Zip Code
                </Label>
                <Controller
                  control={control}
                  id='zipCode'
                  name='zipCode'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='zipCode'
                      name='zipCode'
                      type="text"
                      placeholder='ABC123'
                      invalid={errors.zipCode && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <Input
                  disabled
                  type='email'
                  id='email'
                  defaultValue={selectedUser?.email ?? ''}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='companyName'>
                  Company Name
                </Label>
                <Controller
                  control={control}
                  id='companyName'
                  name='companyName'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='companyName'
                      defaultValue={selectedUser ? selectedUser?.companyName : null}
                      placeholder='clatter'
                      invalid={errors.companyName && true}
                    />
                  )}
                />

              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <Controller
                  control={control}
                  id='state'
                  name='state'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='state'
                      defaultValue={selectedUser ? selectedUser?.state : null}
                      placeholder='Downtown'
                      invalid={errors.state && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='phoneNumber'>
                  Contact
                </Label>
                <Input id='phoneNumber' defaultValue={selectedUser ? selectedUser?.phoneNumber : null} placeholder='+1 609 933 4422' />
              </Col>
              <Col>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <Controller
                  control={control}
                  id='address'
                  name='address'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='address'
                      name='address'
                      type="text"
                      placeholder='North Finchley'
                      invalid={errors.address && true}
                    />
                  )}
                />
              </Col>

            </Row>
            <Row className='mt-1'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  Language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  onChange={handleLanguage}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[languageOptions?.findIndex(i => i.value === selectedUser?.language)] ?? null}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  onChange={handleCountry}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[countryOptions?.findIndex(i => i.value === selectedUser?.country)] ?? null}
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='button'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment >
  )
}

export default UserInfoCard
