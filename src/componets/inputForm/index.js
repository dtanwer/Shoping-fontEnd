import { useEffect, useState } from 'react'
import './index.css'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Checkbox, InputNumber } from 'antd';
import { addProduct, updateMyProduct } from '../../services/product.service';
import { useSelector } from 'react-redux'
const { Option } = Select;
const { TextArea } = Input;
const InputForm = ({ images, data, update, setFileList, setModalOpen }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const user = useSelector((state) => state.auth.user)
    const [isDraft, setDraft] = useState(false);
    const info = () => {
        messageApi.info('Product Saved!');
    };
    const warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
        });
    };
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        if (update) {
            let allImgs = images
            if (images.length == 0) {
                allImgs = data.images;
            }
            else if (images.length < 3) {
                alert("Input altest 3 images of Products");
                return;
            }
            if (allImgs.length < 3) {
                warning("Input altlest 3 Images");
                return;
            }
            try {
                const res = await updateMyProduct({ ...values, images: allImgs, isDraft }, data._id)
                info()
                setFileList([]);
                if (update) {
                    setModalOpen(false)
                }
                // console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log(images)
            if (images.length < 3) {
                warning("Input altlest 3 Images");
                return;
            }

            try {
                const res = await addProduct({ ...values, images, img: images[0], vendorId: user._id, isDraft })
                info()
                onReset();
                setFileList([]);
                // setModalOpen(false)
                // console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        console.log(values);

    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue(data);
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };

    useEffect(() => {
        console.log(data)
        if (update) {
            onFill()
        }
    }, [])
    return (
        <div className='inputForm'>
            {contextHolder}
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item name="title" label="Title" rules={[{ required: true, },]}>
                    <Input placeholder="Enter Title" />
                </Form.Item>
                <Form.Item name="rating" label="Rating" rules={[{ required: true, },]}>
                    <InputNumber placeholder="4.1" />
                </Form.Item>
                <Form.Item name="mrp" label="MRP" rules={[{ required: true, },]}>
                    <InputNumber placeholder="24000" />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, },]}>
                    <InputNumber placeholder="12000" />
                </Form.Item>
                <Form.Item name="discountPercentage" label="Discount" rules={[{ required: true, },]}>
                    <InputNumber placeholder="12" />
                </Form.Item>
                <Form.Item name="stock" label="Stock" rules={[{ required: true, },]}>
                    <InputNumber placeholder="20" />
                </Form.Item>
                <Form.Item name="description" label="TextArea" rules={[{ required: true, },]}>
                    <TextArea placeholder="Enter about Products" rows={4} />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true, },]}>
                    <Select placeholder="Select Category" allowClear>
                        <Option value="mobile">Mobile</Option>
                        <Option value="faction">Faction</Option>
                        <Option value="grocery">Grocery</Option>
                        <Option value="applince">Applince</Option>
                    </Select>
                </Form.Item>
                <Form.List
                    name="highlights"
                    rules={[
                        {
                            validator: async (_, highlights) => {
                                if (!highlights || highlights.length < 2) {
                                    return Promise.reject(new Error('At least 3 highlights'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'highlights' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input highlights or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="highlights name" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                {fields.length < 3 ? (<Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>) : null}
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List
                    name="offers"
                    rules={[
                        {
                            validator: async (_, offers) => {
                                if (!offers || offers.length < 2) {
                                    return Promise.reject(new Error('At least 2 offers'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'offers' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input offers or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="offers name" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                {fields.length < 3 ? (<Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>) : null}
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List
                    name="options"
                    rules={[
                        {
                            validator: async (_, options) => {
                                if (!options || options.length < 2) {
                                    return Promise.reject(new Error('At least 3 options'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'options' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input options or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="options name" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                {fields.length < 3 ? (<Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>) : null}
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Checkbox
                    checked={isDraft}
                    onChange={(e) => setDraft(e.target.checked)}
                >
                    Draft
                </Checkbox>


                <Form.Item {...tailLayout}>

                    {update ?
                        <Button type="primary" htmlType="submit">Update</Button> :
                        <Button type="primary" htmlType="submit">Submit</Button>
                    }
                    {!update && <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>}
                </Form.Item>
            </Form>
        </div>
    )
}

export default InputForm
