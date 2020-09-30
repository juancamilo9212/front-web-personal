import React,{useState,useEffect} from 'react';
import {Switch, List, Button, Modal as ModalAntd, notification} from 'antd';
import Modal from '../../Modal';
import {EditOutlined, DeleteOutlined}  from '@ant-design/icons';
import DragSortableList from 'react-drag-sortable';
import './MenuWebList.scss';
import {updateMenuApi,activateMenuApi,deleteMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';
import AddMenuWebForm from '../AddMenuWebForm/AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWeb/EditMenuWeb';
const {confirm}=ModalAntd;


export default function MenuWebList(props){

    const {menu,setReloadMenuWeb}=props;
    const [listItems, setListItems]=useState([]);
    const [isVisibleModal,setIsVisibleModal]=useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent,setModalContent]=useState(null);
    

    const activateMenu= (menu,status) =>{
        const token=getAccessTokenApi()
        activateMenuApi(token,menu._id,status).then(response => {
            notification["success"]({
                message: response
            })
        }).catch(err => {
            notification["error"]({
                message: err.message
            })
        });
    }

    useEffect(() => {
        const listItemsArray = [];
        menu.forEach(item =>{
            listItemsArray.push({
            content: (<MenuItem 
                item={item} 
                activateMenu={activateMenu} 
                editMenuModal={editMenuModal}
                deleteMenu={deleteMenu}
                />)
            });
        });
        setListItems(listItemsArray);
    }, [menu])


    const onSort= (sortedList,dropEvent) =>{
    
    sortedList.forEach(item => {
        const token = getAccessTokenApi();
        const {_id} = item.content.props.item
        const order = item.rank;
        updateMenuApi(token, _id, {order})
    })
    }

    const addMenuModal= () =>{
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo menu");
        setModalContent(
        <div>
            <AddMenuWebForm 
            setIsVisibleModal={setIsVisibleModal} 
            setReloadMenuWeb={setReloadMenuWeb}/>
        </div>)
    }

    const editMenuModal= menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editando el menu: ${menu.title}`);
        setModalContent(
        <div>
            <EditMenuWebForm
            setIsVisibleModal={setIsVisibleModal} 
            setReloadMenuWeb={setReloadMenuWeb}
            menu={menu}
            />
        </div>)
    }

    const deleteMenu = (menu) =>{
        const token=getAccessTokenApi();
        deleteMenuApi(token,menu._id).then(result => {
            notification["success"]({
                message: result
            })
            setReloadMenuWeb(true);
        }).catch(err => {
            notification["error"]({
                message: err.message
            })
        });
    }

    return(
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuModal}>Crear Menu</Button>
            </div>

            <div className="menu-web-list__items">
            <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
            <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
            >
                {modalContent}
        </Modal>
        </div>
        
    )
}

function MenuItem(props){
const {item,activateMenu, editMenuModal,deleteMenu}= props;
const {Item}=List;
const {Meta}=Item;


return(
<Item actions={[
    <Switch defaultChecked={item.active} onChange={ e => activateMenu(item,e)}/>,
    <Button type="primary" onClick={e => editMenuModal(item)}>
        <EditOutlined />
    </Button>,
    <Button type="danger" onClick={e =>deleteMenu(item)}>
        <DeleteOutlined />
    </Button>
]}>
<Meta title={item.title} description={item.url} />
</Item>

)
}
