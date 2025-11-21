package game.service;

import game.model.Map;
import org.springframework.data.repository.CrudRepository;

public interface MapRepository extends CrudRepository<Map, Long> {
}