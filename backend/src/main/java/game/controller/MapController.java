package game.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import game.controller.dto.MapDTO;
import game.service.MapService;
import game.model.Map;

@RestController
@RequestMapping("api/v1/")
public class MapController {

    @Autowired
    private MapService mapService;

    public MapController() {
    }

    @GetMapping(path= "maps", produces= MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<Iterable<Map>> maps() {
        return ResponseEntity.ok(mapService.findAllMaps());
    }

    @GetMapping(path= "map/{id}", produces= MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<Map> map(@PathVariable (name="id") Long id) {
        if (mapService.findMap(id).isPresent()) {
            return ResponseEntity.ok(mapService.findMap(id).get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(path= "map/{id}", produces= MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<Map> mapdelete(@PathVariable (name="id") Long id) {
        if (mapService.findMap(id).isPresent()) {
            Map res = mapService.findMap(id).get();
            if (mapService.removeMap(id)) {
                return ResponseEntity.ok(res);
            }
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(path = "maps", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map> post(@RequestBody MapDTO map) {
        Map res = mapService.addMap(map);
        return ResponseEntity.ok(res);
    }
}
