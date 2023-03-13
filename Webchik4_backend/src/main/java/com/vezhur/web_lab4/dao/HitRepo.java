package com.vezhur.web_lab4.dao;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HitRepo extends CrudRepository<HitEntity, Integer> {

    List<HitEntity> findAllByUser(UserEntity user);

    void deleteAllByUser(UserEntity user);
}
