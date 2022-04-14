package com.example.demo.service;

import com.example.demo.controller.request.ImovelRequest;
import com.example.demo.controller.response.ImovelResponse;
import com.example.demo.controller.response.PageResponse;
import org.springframework.data.domain.Pageable;

interface ImovelService {

    ImovelResponse create(ImovelRequest imovelRequest);

    ImovelResponse edit(ImovelRequest imovelRequest, String id);

    PageResponse<ImovelResponse> list(Pageable pageable);

    void delete(String id);
}

