package service

import (
    "github.com/user/repo/api/request"
	"github.com/user/repo/api/response"
    "github.com/gofrs/uuid"
)

type ImovelService interface {

    Create(imovelRequest request.Imovel) (response.Imovel, error)

    Edit(imovelRequest request.Imovel, ID uuid.UUID) (response.Imovel, error)

    List() (response.Imovel, error)

    Delete(ID uuid.UUID) error
}

